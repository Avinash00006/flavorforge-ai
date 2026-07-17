# Prompt Engineering Log - FlavorForge AI

This log documents the prompt iteration process for **FlavorForge AI**'s content generation feature during Week 7 (AI API Integration). We tested three prompt variations using Google's `gemini-1.5-flash` model to determine which prompt yields the most creative, high-converting copy.

---

## Tested Prompt Variations

### 📝 Variation 1: Basic Instruction Prompt
* **Description:** A simple, direct listing of the input fields instructing the model to generate content.
* **Prompt Template:**
  ```text
  Generate food content. Title: {title}, Type: {type}, Ingredients: {ingredients}, Tone: {tone}, Target Audience: {targetAudience}.
  ```
* **Example Input:**
  * **Title:** Spicy Pineapple Jam
  * **Type:** description
  * **Ingredients:** Fresh Pineapple, Jalapeño, Pectin, Cane Sugar
  * **Tone:** Energetic
  * **Target Audience:** Breakfast fans
* **Example Output:**
  ```text
  This is a Spicy Pineapple Jam made from fresh pineapple, jalapeño, pectin, and cane sugar. It is energetic and targeted at breakfast fans. It tastes sweet and spicy. Buy it today for your toast.
  ```
* **Critique:** The output is extremely brief, dry, and lacks creative vocabulary. It merely restates the inputs in simple sentences and fails to evoke any sensory appeal.

---

### 🎨 Variation 2: Role-Based Copywriter Persona
* **Description:** Employs a system persona role ("Expert Food Copywriter") to instruct the model to write creative, engaging content.
* **Prompt Template:**
  ```text
  You are an expert food copywriter and brand director. Write a creative {type} for a food product named "{title}" made with {ingredients}. The writing tone must be "{tone}" and targeted specifically at "{targetAudience}". Focus on sensory appeal and quality.
  ```
* **Example Input:** Same as Variation 1.
* **Example Output:**
  ```text
  Kickstart your mornings with a fiery splash of tropical goodness! Our new Spicy Pineapple Jam blends sweet, sun-ripened fresh pineapples with a zesty kick of jalapeño. Specially crafted for breakfast lovers who crave a little excitement on their toast. This jam delivers an energetic burst of flavor that will wake up your taste buds! Minimal ingredients, clean processing. Try it today!
  ```
* **Critique:** Much better! The copy uses sensory descriptors like "fiery splash" and "sun-ripened". However, it has no structural formatting. It creates a generic paragraph regardless of whether the user selected a product description, brand profile, or marketing copy.

---

### ⚡ Variation 3: Custom Styled-Output Prompt (Final Selected)
* **Description:** Tailors the prompt template dynamically based on the selected `type` (Product Description, Brand Positioning, or Marketing Copy) and applies strict output formatting rules.
* **Prompt Template:**
  * **For `description`:**
    ```text
    You are a culinary writer and professional food copywriter. Create a sensory, highly appetizing product description for a food product named "{title}".
    Key Ingredients: {ingredients}
    Target Demographic: {targetAudience}
    Desired Tone: {tone}

    Requirements:
    - Emphasize taste, aroma, sensory texture, and mouthfeel.
    - Suggest a creative food pairing or serving suggestion.
    - Keep the writing style natural, fluent, and strictly matching the requested tone.
    - Length: 3-5 sentences. Do not use placeholders or brackets in the output.
    ```
  * **For `branding`:**
    ```text
    You are a professional brand strategist and creative director. Create a structured Brand Positioning & Identity Profile for a food business named "{title}".
    Core Ingredients: {ingredients}
    Target Audience: {targetAudience}
    Brand Tone: {tone}

    Structure the output into the following four sections using Markdown:
    1. **Core Brand Mission**: A 1-2 sentence statement expressing the brand's purpose.
    2. **Target Persona Alignment**: Explain why this product appeals to "{targetAudience}".
    3. **Brand Voice Guidelines**: Define 3 adjectives representing the brand voice and explain how to write in a "{tone}" manner.
    4. **Core Value Proposition**: A concise bulleted list of 3 unique selling points (USPs) based on ingredients ("{ingredients}").
    ```
  * **For `marketing`:**
    ```text
    You are a high-converting conversion copywriter and social media marketer. Write engaging marketing copywriting and advertising copy for a food product named "{title}".
    Key Ingredients: {ingredients}
    Target Audience: {targetAudience}
    Writing Tone: {tone}

    Requirements:
    - Start with an attention-grabbing hook (use emojis).
    - List 3 bulleted features and benefits (e.g. why they should buy it).
    - End with a compelling Call-to-Action (CTA) prompting a purchase.
    - Include 3 relevant hashtags at the bottom.
    - Match the "{tone}" tone precisely.
    ```
* **Example Input:** Same as Variation 1.
* **Example Output (for Type: marketing):**
  ```text
  🍍 Wake up your toast with a sweet & spicy kick! 🔥

  Get ready to revolutionize your morning routine with our brand-new **Spicy Pineapple Jam**. Crafting culinary excitement by combining sun-drenched fresh pineapples with a zesty crunch of fresh jalapeños, this is the ultimate breakfast spread.

  ✨ Why you'll love it:
  • **Tropical Heat:** Perfect balance of tropical sweetness and a punchy jalapeño kick.
  • **Clean Ingredients:** Simple recipe made with fresh pineapple, pectin, and organic cane sugar.
  • **Breakfast Fuel:** Designed specifically to add an energetic burst of flavor to breakfast classics.

  🛒 Grab a jar today and spice up your breakfast!
  
  #SpicyPineappleJam #BreakfastGourmet #FlavorForge
  ```
* **Critique:** This variation delivers exceptional results. By adjusting the prompt structure to match the output type (sensory paragraph for descriptions, markdown categories for brand assets, and hooks/bullets/hashtags for marketing), it produces highly professional content that matches the writing tone.

---

## Conclusion & Evaluation

**Variation 3** was selected as the final generation prompt. 

By designing distinct prompt paths for each of our three content types, we ensure that:
1. **Descriptions** are written as continuous, descriptive copy suitable for e-commerce catalog listings.
2. **Brand Profiles** are structured strategically as business assets with clear headings.
3. **Marketing Copy** uses emojis, hooks, CTAs, and hashtags optimized for social media posts.

Additionally, specifying the desired tone as a stylistic instruction allows Google's `gemini-1.5-flash` model to dynamically shift vocabularies (e.g., swapping "culinary excellence" in a Professional tone with "game-changing snack" in an Energetic tone), producing highly customized content.
