/**
 * In-Memory Mock Database
 * 
 * During Week 4, we use a standard JavaScript array stored in-memory on the server.
 * This simulates a database before we hook up MongoDB Atlas in Week 5.
 * 
 * Note: If the backend server restarts (e.g., due to file modifications when using nodemon),
 * the array is re-initialized to these default items.
 */

const contentItems = [
  {
    id: "1",
    title: "Tangy Mango Chilli Chutney",
    type: "description",
    description: "A gourmet condiment made from ripe mangoes and bird's eye chillies.",
    ingredients: "Ripe Mangoes, Bird's Eye Chilli, Vinegar, Cane Sugar, Mustard Seeds",
    targetAudience: "Gourmet lovers & spicy food enthusiasts",
    tone: "Engaging",
    generatedText: "Bursting with sun-ripened tropical sweetness and followed by a fiery punch of handpicked bird's eye chillies, our Tangy Mango Chilli Chutney is the perfect spread to elevate your cheese boards, grilled meats, and savory snacks. Crafted using traditional slow-cooking methods to lock in the vibrant natural flavors.",
    status: "published",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Created 1 day ago
  },
  {
    id: "2",
    title: "Pure Organics Oat Milk",
    type: "branding",
    description: "Eco-friendly, unsweetened, organic oat milk for coffee and baking.",
    ingredients: "Organic Oats, Filtered Water, Sea Salt",
    targetAudience: "Health-conscious consumers & vegans",
    tone: "Professional",
    generatedText: "FlavorForge AI Brand Positioning:\n\n1. CORE VALUE: Sustainability-first nutrition.\n2. EMOTIONAL HOOK: Kind to your body, gentler on the planet.\n3. COMPETITIVE ADVANTAGE: Zero added sugars, pure organic oats, frothable barista-grade texture.\n4. BRAND VOICE: Transparent, wholesome, and premium.",
    status: "draft",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Created 2 days ago
  },
  {
    id: "3",
    title: "Spiced Himalayan Pink Salt Almonds",
    type: "marketing",
    description: "Dry roasted almonds dusted with cracked pepper and Himalayan pink salt.",
    ingredients: "California Almonds, Himalayan Pink Salt, Black Pepper, Olive Oil",
    targetAudience: "Keto snackers & active professionals",
    tone: "Friendly",
    generatedText: "💥 SNACK SMARTER, SNACK BOLDER! 💥\n\nLooking for the ultimate high-protein fuel? Meet our Spiced Himalayan Pink Salt Almonds! Dry-roasted to crunchy perfection and lightly coated with extra virgin olive oil, cracked black pepper, and authentic pink salt. Perfect for keto snackers and active professionals. Grab your pack today! 🥜✨",
    status: "published",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // Created 3 days ago
  }
];

// Exporting the array so it can be read and mutated by controllers
module.exports = contentItems;
