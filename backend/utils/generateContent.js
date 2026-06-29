/**
 * Mock Content Generator Utility
 * 
 * In Week 7, we will integrate the Google Gemini API to dynamically generate text.
 * For Week 4, we use this utility to mock-generate creative product descriptions,
 * brand positioning profiles, and marketing copywriting based on user inputs.
 * 
 * @param {string} type - 'description' | 'branding' | 'marketing'
 * @param {string} title - Product Name
 * @param {string} ingredients - List of ingredients
 * @param {string} tone - Desired writing tone (e.g. Engaging, Professional, Friendly)
 * @param {string} targetAudience - Targeted consumer demographic
 * @returns {string} - Mock AI-generated text response
 */
const generateMockContent = (type, title, ingredients, tone, targetAudience) => {
  const brand = title || "FlavorForge Gourmet Item";
  const ingreds = ingredients || "all-natural premium ingredients";
  const audience = targetAudience || "food lovers";
  const toneStyle = tone || "Engaging";

  // Customize mock text based on the specific feature type selected
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

module.exports = generateMockContent;
