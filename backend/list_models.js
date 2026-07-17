/**
 * List Gemini Models Utility
 * 
 * Queries the Google API to retrieve all available model identifiers
 * associated with your API key.
 */

require('dotenv').config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.error("❌ Error: GEMINI_API_KEY is not configured in your .env file.");
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    console.log("📡 Fetching active models list from Google AI Studio...");
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("\n=========================================");
    console.log("✅ Available Models for your API Key:");
    console.log("=========================================");
    
    if (data.models && Array.isArray(data.models)) {
      data.models.forEach(model => {
        // Print the short name (e.g. gemini-1.5-flash) and its description
        const shortName = model.name.replace('models/', '');
        console.log(`• ID: ${shortName}`);
        console.log(`  Description: ${model.description}`);
        console.log(`  Supported Methods: ${model.supportedGenerationMethods.join(', ')}\n`);
      });
    } else {
      console.log("No models returned in response data:", data);
    }
    console.log("=========================================");
  } catch (error) {
    console.error("❌ Failed to retrieve models:", error.message);
  }
}

listModels();
