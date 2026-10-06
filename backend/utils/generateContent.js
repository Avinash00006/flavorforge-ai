/**
 * Content Generator Utility
 * 
 * Integrates the Google Gemini API using the official Google Generative AI Node.js SDK.
 * Includes a robust fail-safe try-catch wrapper with local fallback templates.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Local Fail-Safe Template Generator
 * Used as a fallback when the API key is missing or the external API call fails.
 */
const generateLocalBackup = (type, title, ingredients, tone, targetAudience, description, channel) => {
  const brand = title || "FlavorForge Gourmet Item";
  const ingreds = ingredients || "all-natural premium ingredients";
  const audience = targetAudience || "food lovers";
  const toneStyle = tone || "Sensory & Gourmet";
  const extraContext = description || "";
  const platform = channel || "Social Media & E-Commerce";

  if (type === 'description') {
    return `Discover the exquisite flavor profile of "${brand}"! Masterfully prepared using handpicked ${ingreds}, this creation is curated with a ${toneStyle.toLowerCase()} sensibility for ${audience}. ${extraContext ? `Featuring ${extraContext.toLowerCase()}, ` : ''}it delivers an authentic balance of aroma and rich mouthfeel to your table. A true standout for your culinary collection.`;
  } else if (type === 'branding') {
    return `FlavorForge AI Brand Positioning & Identity Profile for ${brand}:\n\n` +
           `1. CORE BRAND MISSION:\n` +
           `   To bring the culinary excellence of ${ingreds} directly to consumers who demand authenticity and exceptional taste.\n\n` +
           `2. TARGET PERSONA ALIGNMENT:\n` +
           `   Positioned specifically for ${audience} who value provenance, clean flavor, and craft quality.\n\n` +
           `3. BRAND VOICE & PERSONALITY:\n` +
           `   A ${toneStyle.toLowerCase()} voice communicating confidence, culinary authority, and passion.\n\n` +
           `4. UNIQUE VALUE PROPOSITION (USP):\n` +
           `   • Pure ingredient integrity centered on ${ingreds}.\n` +
           `   • ${extraContext ? extraContext : 'Distinct gastronomic profile standing out in modern retail.'}\n` +
           `   • Uncompromising commitment to sensory flavor craftsmanship.`;
  } else {
    // type === 'marketing'
    return `🔥 TASTE ELEVATION HAS ARRIVED! 🔥\n\n` +
           `Ready to experience pure culinary pleasure? Introducing "${brand}" — crafted with ${ingreds} exclusively for ${audience} on ${platform}.\n\n` +
           `${extraContext ? `✨ Featured Highlight: ${extraContext}\n\n` : ''}` +
           `Why food lovers choose ${brand}:\n` +
           `• Chef-inspired flavor balance crafted with ${toneStyle.toLowerCase()} personality\n` +
           `• Clean, honest ingredients you can taste in every bite\n` +
           `• Guaranteed to satisfy your cravings\n\n` +
           `🛒 Order yours today and taste the difference!\n` +
           `#FoodieFavorites #${brand.replace(/[^a-zA-Z0-9]/g, '')} #FlavorForgeAI`;
  }
};

/**
 * Async Content Generator
 * Calls the Google Gemini API to generate tailored food brand assets.
 */
const generateContent = async (type, title, ingredients, tone, targetAudience, description, channel) => {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fail-safe check: If key is absent or a placeholder, fallback immediately
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not configured or is a placeholder. Falling back to local template generator.");
    return generateLocalBackup(type, title, ingredients, tone, targetAudience, description, channel);
  }

  try {
    // Initialize the Gemini AI SDK client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Load gemini-3.1-flash-lite for active production generation
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

    const brand = title || "Gourmet Food Product";
    const ingreds = ingredients || "natural culinary ingredients";
    const audience = targetAudience || "curated food lovers";
    const toneStyle = tone || "Sensory & Gourmet";
    const extraContext = description ? description.trim() : "";
    const platform = channel ? channel.trim() : "Social Media & E-Commerce Ads";

    let prompt = "";
    if (type === 'description') {
      prompt = `You are a culinary writer, gastronomy expert, and sensory food copywriter. Create a captivating, highly appetizing product description for a food product named "${brand}".
Key Ingredients & Flavor Profile: ${ingreds}
${extraContext ? `Sensory Notes, Texture & Serving Pairings: ${extraContext}\n` : ''}Target Audience: ${audience}
Desired Tone: ${toneStyle}

Requirements:
- Emphasize aroma, taste complexity, mouthfeel, and texture.
- Include a creative serving suggestion or flavor pairing.
- Writing style must be evocative, mouth-watering, and strictly reflect the "${toneStyle}" tone.
- Length: 3-5 vivid sentences. Do not use generic placeholders, hashtags, or bracketed text.`;
    } else if (type === 'branding') {
      prompt = `You are an elite food brand strategist and creative director. Develop an authoritative, distinct Brand Positioning & Identity Profile for a food business named "${brand}".
Core Ingredients & Culinary Philosophy: ${ingreds}
${extraContext ? `Brand Mission & Category Differentiator: ${extraContext}\n` : ''}Target Demographic: ${audience}
Brand Tone: ${toneStyle}

Structure the output into the following four sections using clean Markdown:
1. **Core Brand Mission**: A crisp, inspiring 1-2 sentence mission statement expressing the brand's purpose.
2. **Target Persona Alignment**: Explain who this speaks to (${audience}) and what emotional food desires it satisfies.
3. **Brand Voice & Personality Guidelines**: Detail 3 defining voice adjectives and how to communicate with "${toneStyle}" styling.
4. **Unique Value Proposition (USP)**: 3 punchy, bulleted differentiators based on ingredients and culinary craftsmanship.`;
    } else {
      // type === 'marketing'
      prompt = `You are a top-tier direct-response food marketer and advertising copywriter. Write compelling promotional copy tailored for ${platform} for a food product named "${brand}".
Product Highlights & Ingredients: ${ingreds}
${extraContext ? `Campaign Angle / Special Offer: ${extraContext}\n` : ''}Target Audience: ${audience}
Advertising Tone: ${toneStyle}
Target Platform / Format: ${platform}

Requirements:
- Start with an irresistible, scroll-stopping headline/hook (incorporating tasteful emojis).
- Provide 3 punchy benefit-driven bullet points focusing on cravings, quality, or convenience.
- Include a strong, urgent Call-to-Action (CTA).
- Include 3-4 trending, relevant culinary/foodie hashtags.
- Precisely adhere to the "${toneStyle}" tone and format suitable for ${platform}.`;
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
    return generateLocalBackup(type, title, ingredients, tone, targetAudience, description, channel);
  }
};

module.exports = generateContent;
