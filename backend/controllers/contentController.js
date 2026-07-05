/**
 * Content Item Controller
 * 
 * Handles business logic for the 6 REST API endpoints.
 * Refactored in Week 5 to use the Mongoose ODM and read/write 
 * directly from the MongoDB database instead of the in-memory mockData.
 */

// Import Mongoose model for ContentItem
const ContentItem = require('../models/ContentItem');
const generateMockContent = require('../utils/generateContent');

/**
 * 1. GET /api/content
 * Returns a list of all generated food processing content items.
 * Ordered by creation date (newest first).
 */
const listContent = async (req, res, next) => {
  try {
    // Query all records from ContentItem collection, sorted newest-first
    const items = await ContentItem.find().sort({ createdAt: -1 });

    // Respond with HTTP 200 (OK)
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    // Pass database or system exceptions to the global errorHandler middleware
    next(error);
  }
};

/**
 * 2. GET /api/content/search
 * Searches content items using regex matching query parameter ?q=... 
 * and optional type filter ?type=...
 */
const searchContent = async (req, res, next) => {
  try {
    const { q, type } = req.query;
    const queryObj = {};

    // Filter by type if provided ('description', 'branding', 'marketing')
    if (type && type !== 'all') {
      queryObj.type = type;
    }

    // Perform case-insensitive regex search on title, description, or AI text
    if (q) {
      const regexSearch = new RegExp(q, 'i'); // 'i' flag matches case-insensitively
      queryObj.$or = [
        { title: regexSearch },
        { description: regexSearch },
        { generatedText: regexSearch }
      ];
    }

    // Fetch matching documents, sorted by newest
    const items = await ContentItem.find(queryObj).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 3. GET /api/content/:id
 * Fetches a single generated content item by its unique database ID.
 */
const getContentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find document by Mongoose ObjectId
    const item = await ContentItem.findById(id);

    // If no document matches the ID, throw HTTP 404 (Not Found)
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
    // Captures invalid ObjectId cast errors (e.g. if the ID format is malformed)
    next(error);
  }
};

/**
 * 4. POST /api/content
 * Creates a new content item. Simulates AI generation, and saves the new record to MongoDB.
 */
const createContent = async (req, res, next) => {
  try {
    const { title, type, description, ingredients, tone, targetAudience } = req.body;

    // Validate request inputs
    if (!title || !type) {
      const error = new Error("Validation Error: 'title' and 'type' are required fields.");
      error.statusCode = 400; // HTTP 400 Bad Request
      return next(error);
    }

    // Mock AI text generator (integrates with Gemini in Week 7)
    const generatedText = generateMockContent(type, title, ingredients, tone, targetAudience);

    // Create and save document in one step using Model.create()
    const newItem = await ContentItem.create({
      title,
      type,
      description: description || "",
      ingredients: ingredients || "",
      targetAudience: targetAudience || "",
      tone: tone || "Engaging",
      generatedText,
      status: "draft" // Default to draft upon creation
    });

    // Return HTTP 201 (Created)
    res.status(201).json({
      success: true,
      message: "Content generated and saved to database successfully.",
      data: newItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 5. PUT /api/content/:id
 * Updates properties (like generatedText, title, or publication status) of a document in MongoDB.
 */
const updateContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validation guard: Title must not be empty if updated
    if (req.body.title === "") {
      const error = new Error("Validation Error: Title cannot be empty.");
      error.statusCode = 400;
      return next(error);
    }

    // Find and update document.
    // { new: true } returns the updated document rather than the original one.
    // { runValidators: true } runs mongoose validation checks on the modified fields.
    const updatedItem = await ContentItem.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    // If ID is not found, return 404
    if (!updatedItem) {
      const error = new Error(`Content item with ID ${id} not found.`);
      error.statusCode = 404;
      return next(error);
    }

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
 * Deletes a content item from MongoDB.
 */
const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find and delete the document in one step
    const deletedItem = await ContentItem.findByIdAndDelete(id);

    // If ID is not found, return 404
    if (!deletedItem) {
      const error = new Error(`Content item with ID ${id} not found.`);
      error.statusCode = 404;
      return next(error);
    }

    // Return HTTP 204 (No Content) for successful deletions as per spec
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
