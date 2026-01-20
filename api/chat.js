
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

// Load Embeddings (Read directly from the api folder)
const embeddingsPath = path.join(process.cwd(), 'api', 'resume_embeddings.json');
let resumeData = [];

try {
    if (fs.existsSync(embeddingsPath)) {
        resumeData = JSON.parse(fs.readFileSync(embeddingsPath, 'utf-8'));
    }
} catch (error) {
    console.error('Error loading embeddings:', error);
}

// Cosine Similarity Function
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export default async function handler(req, res) {
    // Manual CORS for Serverless
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        if (resumeData.length === 0) {
            return res.status(503).json({ error: 'Knowledge base not loaded.' });
        }

        // Embed query
        const userEmbeddingResult = await embeddingModel.embedContent(message);
        const userEmbedding = userEmbeddingResult.embedding.values;

        // Retrieval
        const scoredChunks = resumeData.map(chunk => ({
            ...chunk,
            score: cosineSimilarity(userEmbedding, chunk.embedding)
        }));
        scoredChunks.sort((a, b) => b.score - a.score);
        const contextText = scoredChunks.slice(0, 3).map(chunk => chunk.text).join('\n---\n');

        // Models to try
        const models = ["gemini-2.5-flash"];
        let text = "";

        const systemInstruction = `
    You are the AI career assistant for Trivendar Reddy Nukala.
    Answer recruiter questions based ONLY on provided chunks.
    FORMAT:
    ✅ Short Answer: (2-3 lines)
    📌 Key Points: (Bullet points)
    🧰 Tech Stack: ...
    🔗 Related Project/Link: ...
    If unknown, say: "I don’t have that information in Trivendar’s resume/portfolio."
    `;

        // Try available models
        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(systemInstruction + "\n\n" + message + "\n\nContext:\n" + contextText);
                const response = await result.response;
                text = response.text();
                if (text) break;
            } catch (e) {
                continue;
            }
        }

        if (!text) throw new Error("All models failed.");
        res.json({ reply: text });

    } catch (error) {
        res.status(500).json({ error: 'Failed', details: error.message });
    }
}
