
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function createEmbeddings() {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        console.error('❌ Error: GEMINI_API_KEY is not set in server/.env');
        process.exit(1);
    }

    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    const sourcePath = path.join(__dirname, '../data/resume_source.txt');
    const outputPath = path.join(__dirname, '../data/resume_embeddings.json');

    try {
        const text = fs.readFileSync(sourcePath, 'utf-8');

        // Simple chunking by paragraphs, keeping them of reasonable size
        // For a resume, splitting by sections (double newlines) usually works best
        const rawChunks = text.split(/\n\s*\n/);
        const chunks = rawChunks.filter(chunk => chunk.trim().length > 0);

        console.log(`Found ${chunks.length} chunks. Generating embeddings...`);

        const data = [];

        for (const chunk of chunks) {
            const result = await model.embedContent(chunk);
            const embedding = result.embedding;
            data.push({
                text: chunk,
                embedding: embedding.values
            });
            process.stdout.write('.');
        }

        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log('\n✅ Embeddings generated and saved to resume_embeddings.json');

    } catch (error) {
        console.error('\n❌ Error generating embeddings:', error);
    }
}

createEmbeddings();
