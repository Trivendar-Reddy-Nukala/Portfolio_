
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
    console.log("Testing Gemini API connection...");
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ No API Key found in env!");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log("Generating content...");
        const result = await model.generateContent("Say hello world");
        const response = await result.response;
        const text = response.text();
        console.log("✅ Success! Response:", text);

    } catch (error) {
        console.error("❌ Failed:", error.message);
        if (error.response) {
            console.error("Response details:", error.response);
        }
    }
}

test();
