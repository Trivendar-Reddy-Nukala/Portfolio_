
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

// Fallback Model Strategy
const distinctModels = ["gemini-2.5-flash"];
let activeModel = null;

async function getWorkingModel() {
    if (activeModel) return activeModel;

    console.log("🔄 Testing available Gemini models...");
    for (const modelName of distinctModels) {
        try {
            // console.log(`Checking ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            // Simple test generation to verify access
            await model.generateContent("Test");
            console.log(`✅ Connected to model: ${modelName}`);
            activeModel = model;
            return model;
        } catch (e) {
            console.warn(`⚠️ Model ${modelName} failed`);
        }
    }
    throw new Error("No available Gemini models found for this API Key.");
}

// Load Embeddings
let resumeData = [];
const embeddingsPath = path.join(__dirname, 'data/resume_embeddings.json');

try {
    if (fs.existsSync(embeddingsPath)) {
        resumeData = JSON.parse(fs.readFileSync(embeddingsPath, 'utf-8'));
        console.log(`✅ Loaded ${resumeData.length} chunks from knowledge base.`);
    } else {
        console.warn('⚠️ Warning: resume_embeddings.json not found. Run "npm run create-embeddings" first.');
    }
} catch (error) {
    console.error('❌ Error loading embeddings:', error);
}

// Cosine Similarity Function
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        if (resumeData.length === 0) {
            return res.status(503).json({ error: 'Server warming up or missing knowledge base.' });
        }

        // 1. Embed the user query
        const userEmbeddingResult = await embeddingModel.embedContent(message);
        const userEmbedding = userEmbeddingResult.embedding.values;

        // 2. Find similar chunks
        const scoredChunks = resumeData.map(chunk => ({
            ...chunk,
            score: cosineSimilarity(userEmbedding, chunk.embedding)
        }));

        // Sort by score descending and take top 3
        scoredChunks.sort((a, b) => b.score - a.score);
        const topChunks = scoredChunks.slice(0, 3);

        // Construct Context
        const contextText = topChunks.map(chunk => chunk.text).join('\n---\n');

        console.log("Top Chunks scores:", topChunks.map(c => c.score));

        // 3. Get Working Model & Generate Answer
        const model = await getWorkingModel();

        const systemInstruction = `
    You are the AI career assistant for Trivendar Reddy Nukala.
    
    STRICT OBJECTIVE: Answer recruiter questions based ONLY on the provided resume/portfolio chunks.
    
    RESPONSE FORMAT (Strictly followed):
    
    ✅ Short Answer:
    (A clear, concise 2-3 line summary answering the core question)
    
    📌 Key Points:
    • (Bullet point 1)
    • (Bullet point 2)
    • (Bullet point 3)
    
    🧰 Tech Stack (if relevant): (List technologies or "N/A")
    
    🔗 Related Project/Link (if available): (Project Name + Link or "N/A")
    
    TONE:
    - Professional, helping, and recruiter-friendly.
    - No fluff or over-explaining.
    - If the answer is NOT in the chunks, respond exactly: "I don’t have that information in Trivendar’s resume/portfolio."
    `;

        const prompt = `
    Context from Resume/Portfolio:
    ${contextText}

    User Question: ${message}
    `;

        // Important: Some models like gemini-pro don't support systemInstruction as a separate arg in all versions
        // So we prepend it to the prompt which is universally supported
        const result = await model.generateContent(systemInstruction + "\n\n" + prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Failed to generate response', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
