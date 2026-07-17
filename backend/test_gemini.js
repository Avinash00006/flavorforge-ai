/**
 * Direct Gemini API Test Script
 * 
 * Tests the Google Generative AI integration by calling generateContent
 * directly and logging the response.
 */

// Load environment variables
require('dotenv').config();
const generateContent = require('./utils/generateContent');

async function testGemini() {
  console.log("=========================================");
  console.log("🤖 Testing Google Gemini API Integration...");
  console.log(`📡 API Key configured: ${process.env.GEMINI_API_KEY ? "YES" : "NO"}`);
  console.log("=========================================\n");

  try {
    console.log("👉 Sending request to Gemini (gemini-1.5-flash)...");
    const result = await generateContent(
      'description',
      'Spicy Pineapple Jam',
      'Fresh Pineapple, Jalapeño, Pectin, Cane Sugar',
      'Energetic',
      'Breakfast fans'
    );

    console.log("\n=========================================");
    console.log("✅ Success! Gemini AI Response:");
    console.log("=========================================");
    console.log(result);
    console.log("=========================================");
  } catch (error) {
    console.error("❌ Test Failed:", error.message);
  }
}

testGemini();
