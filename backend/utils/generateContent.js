/**
 * Content Generator Utility
 * 
 * Refactored in Week 7 to integrate the Google Gemini API (`gemini-1.5-flash`)
 * using the official Google Generative AI Node.js SDK.
 * 
 * Includes a robust fail-safe try-catch wrapper: if the Gemini key is missing,
 * or if the API call fails/times out, it automatically falls back to generating 
 * high-quality mock text templates, ensuring the application remains fully functional.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Local Fail-Safe Template Generator
 * Used as a fallback when the API key is missing or the external API call fails.
 */
const generateLocalBackup = (type, title, ingredients, tone, targetAudience) => {
  const brand = title || "FlavorForge Gourmet Item";
  const ingreds = ingredients || "all-natural premium ingredients";
  const audience = targetAudience || "food lovers";
  const toneStyle = tone || "Engaging";

  if (type === 'description') {
    return `Discover the exquisite flavor profile of our brand-new "${brand}"! Masterfully prepared using handpicked ${ingreds}, this delicious creation is tailored for ${audience}. Curated with an ${toneStyle.toLowerCase()} tone in mind, it delivers a perfect balance of authentic taste and wholesome nutrition to your table. Add a touch of gourmet to your daily meals today!`;
  } else if (type === 'branding') {
    return `FlavorForge AI Brand Positioning & Identity Profile for ${brand}:\n\n` +
           `1. CORE MISSION:\n` +
           `   To bring the authentic taste of ${ingreds} directly to consumers who value premium quality.\n\n` +
           `2. AUDIENCE ALIGNMENT:\n` +
           `   Positioned specifically for ${audience} who seek both flavor and transparency.\n\n` +
           `3. BRAND VOICE & PERSONALITY:\n` +
           `   A highly ${toneStyle.toLowerCase()} and trusted voice that communicates culinary excellence.\n\n` +
           `4. VALUE PROPOSITION:\n` +
           `   Unmatched flavor integrity, minimal processing, and clean-label ingredients.`;
  } else {
    // type === 'marketing'
    return `🔥 TASTE ELEVATION IS HERE! 🔥\n\n` +
           `Are you ready to transform your snack game? Say hello to our new ${brand}! Crafted with love and loaded with ${ingreds}, it is the ultimate snack designed for ${audience}.\n\n` +
           `Whether you're hosting a party, packing lunches, or refueling on the go, this snack is a must-have.\n\n` +
           `✨ Why choose ${brand}?\n` +
           `• Pure, wholesome ingredients\n` +
           `• Delectable taste tailored for you\n` +
           `• Infused with ${toneStyle.toLowerCase()} styling\n\n` +
           `🛒 Buy yours today and experience flavor like never before!`;
  }
};

/**
 * Async Content Generator
 * Calls the Google Gemini API to generate tailored food brand assets.
 */
const generateContent = async (type, title, ingredients, tone, targetAudience) => {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fail-safe check: If key is absent or a placeholder, fallback immediately
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not configured or is a placeholder. Falling back to local template generator.");
    return generateLocalBackup(type, title, ingredients, tone, targetAudience);
  }

  try {
    // Initialize the Gemini AI SDK client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Load gemini-3.1-flash-lite for active production generation
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

    const brand = title || "Gourmet Food Product";
    const ingreds = ingredients || "natural raw ingredients";
    const audience = targetAudience || "general consumers";
    const toneStyle = tone || "Engaging";

    // Dynamic prompt engineering templates - Variation 3 (Custom Styled-Output)
    let prompt = "";
    if (type === 'description') {
      prompt = `You are a culinary writer and professional food copywriter. Create a sensory, highly appetizing product description for a food product named "${brand}".
Key Ingredients: ${ingreds}
Target Demographic: ${audience}
Desired Tone: ${toneStyle}

Requirements:
- Emphasize taste, aroma, sensory texture, and mouthfeel.
- Suggest a creative food pairing or serving suggestion.
- Keep the writing style natural, fluent, and strictly matching the requested tone.
- Length: 3-5 sentences. Do not use placeholders or brackets in the output.`;
    } else if (type === 'branding') {
      prompt = `You are a professional brand strategist and creative director. Create a structured Brand Positioning & Identity Profile for a food business named "${brand}".
Core Ingredients: ${ingreds}
Target Audience: ${audience}
Brand Tone: ${toneStyle}

Structure the output into the following four sections using Markdown:
1. **Core Brand Mission**: A 1-2 sentence statement expressing the brand's purpose.
2. **Target Persona Alignment**: Explain why this product appeals to "${audience}".
3. **Brand Voice Guidelines**: Define 3 adjectives representing the brand voice and explain how to write in a "${toneStyle}" manner.
4. **Core Value Proposition**: A concise bulleted list of 3 unique selling points (USPs) based on ingredients ("${ingreds}").`;
    } else {
      // type === 'marketing'
      prompt = `You are a high-converting conversion copywriter and social media marketer. Write engaging marketing copywriting and advertising copy for a food product named "${brand}".
Key Ingredients: ${ingreds}
Target Audience: ${audience}
Writing Tone: ${toneStyle}

Requirements:
- Start with an attention-grabbing hook (use emojis).
- List 3 bulleted features and benefits (e.g. why they should buy it).
- End with a compelling Call-to-Action (CTA) prompting a purchase.
- Include 3 relevant hashtags at the bottom.
- Match the "${toneStyle}" tone precisely.`;
    }

    // Call the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim() === "") {
      throw new Error("Empty text returned from Gemini API");
    }

    return text.trim();
  } catch (error) {
    console.error(`❌ Gemini API Call Failed: ${error.message}. Falling back to local template generator.`);
    // Return backup template on API failures to prevent server crashes
    return generateLocalBackup(type, title, ingredients, tone, targetAudience);
  }
};

module.exports = generateContent;
