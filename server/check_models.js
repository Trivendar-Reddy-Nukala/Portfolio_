
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ No API Key found!");
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        const models = [
            "gemini-1.5-flash",
            "models/gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        console.log("Checking model availability...");

        for (const modelName of models) {
            process.stdout.write(`Testing ${modelName}... `);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hi");
                const response = await result.response;
                console.log(`✅ OK`);
            } catch (e) {
                console.log(`❌ Failed. Error: ${e.message}`);
            }
        }

    } catch (error) {
        console.error("Fatal error:", error);
    }
}

listModels();
