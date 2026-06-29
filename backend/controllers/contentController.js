// Import in-memory mock database array and mock content generator utility
let contentItems = require('../data/mockData');
const generateMockContent = require('../utils/generateContent');

/**
 * 1. GET /api/content
 * Returns a list of all generated food processing content items.
 */
const listContent = (req, res, next) => {
  try {
    // Respond with status HTTP 200 (OK) and the content array
    res.status(200).json({
      success: true,
      count: contentItems.length,
      data: contentItems
    });
  } catch (error) {
    next(error); // Pass error to global errorHandler middleware
  }
};

/**
 * 2. GET /api/content/search
 * Searches content items matching query parameter ?q=... (case-insensitive title/description/generatedText search)
 * and optional type filter ?type=...
 */
const searchContent = (req, res, next) => {
  try {
    const { q, type } = req.query;
    let filteredItems = [...contentItems];

    // Filter by type if provided ('description', 'branding', 'marketing')
    if (type) {
      filteredItems = filteredItems.filter(item => item.type === type);
    }

    // Search query match (in title, description, or generatedText)
    if (q) {
      const queryLower = q.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        item.title.toLowerCase().includes(queryLower) ||
        item.description.toLowerCase().includes(queryLower) ||
        item.generatedText.toLowerCase().includes(queryLower)
      );
    }

    res.status(200).json({
      success: true,
      count: filteredItems.length,
      data: filteredItems
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 3. GET /api/content/:id
 * Fetches a single generated content item by its unique ID.
 */
const getContentById = (req, res, next) => {
  try {
    const { id } = req.params;
    const item = contentItems.find(item => item.id === id);

    // If item not found, return HTTP 404 (Not Found)
    if (!item) {
      const error = new Error(`Content item with ID ${id} not found.`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 4. POST /api/content
 * Creates a new content item. Simulates AI generation based on user parameters,
 * appends the new object to the in-memory array, and returns the result.
 */
const createContent = (req, res, next) => {
  try {
    const { title, type, description, ingredients, tone, targetAudience } = req.body;

    // Validation: Title and Type are mandatory
    if (!title || !type) {
      const error = new Error("Validation Error: 'title' and 'type' are required fields.");
      error.statusCode = 400; // HTTP 400 Bad Request
      return next(error);
    }

    // Generate simulated AI response text
    const generatedText = generateMockContent(type, title, ingredients, tone, targetAudience);

    // Create new content object
    const newItem = {
      id: String(Date.now()), // Sequential/unique string ID using timestamp
      title,
      type,
      description: description || "",
      ingredients: ingredients || "",
      targetAudience: targetAudience || "",
      tone: tone || "Engaging",
      generatedText,
      status: "draft", // Defaults to 'draft' when created
      createdAt: new Date().toISOString()
    };

    // Add to in-memory list
    contentItems.unshift(newItem); // Add to the front of the list

    // Return HTTP 201 (Created) representing a successful resource creation
    res.status(201).json({
      success: true,
      message: "Content generated and saved successfully.",
      data: newItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 5. PUT /api/content/:id
 * Updates an existing content item (e.g. toggles status draft/published, or edits title/generatedText).
 */
const updateContent = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, status, generatedText, description, ingredients, tone, targetAudience } = req.body;

    // Find the item index in our array
    const itemIndex = contentItems.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      const error = new Error(`Content item with ID ${id} not found.`);
      error.statusCode = 404;
      return next(error);
    }

    // Retrieve the original item
    const originalItem = contentItems[itemIndex];

    // Build the updated object, merging incoming body fields or keeping originals
    const updatedItem = {
      ...originalItem,
      title: title !== undefined ? title : originalItem.title,
      status: status !== undefined ? status : originalItem.status,
      generatedText: generatedText !== undefined ? generatedText : originalItem.generatedText,
      description: description !== undefined ? description : originalItem.description,
      ingredients: ingredients !== undefined ? ingredients : originalItem.ingredients,
      tone: tone !== undefined ? tone : originalItem.tone,
      targetAudience: targetAudience !== undefined ? targetAudience : originalItem.targetAudience
    };

    // Perform validation if title or status is changed
    if (updatedItem.title === "") {
      const error = new Error("Validation Error: Title cannot be empty.");
      error.statusCode = 400;
      return next(error);
    }

    // Save back to in-memory array
    contentItems[itemIndex] = updatedItem;

    // Return HTTP 200 (OK) with updated resource
    res.status(200).json({
      success: true,
      message: "Content updated successfully.",
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 6. DELETE /api/content/:id
 * Deletes a content item from the in-memory array.
 */
const deleteContent = (req, res, next) => {
  try {
    const { id } = req.params;
    const itemIndex = contentItems.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      const error = new Error(`Content item with ID ${id} not found.`);
      error.statusCode = 404;
      return next(error);
    }

    // Remove item from array
    contentItems.splice(itemIndex, 1);

    // Return HTTP 204 (No Content) as requested in PDF deliverables for DELETE
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContent,
  searchContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent
};
