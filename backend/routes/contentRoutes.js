const express = require('express');
const router = express.Router();

// Import controller functions
const {
  listContent,
  searchContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent
} = require('../controllers/contentController');

/**
 * REST Route Declarations
 * 
 * Express evaluates routes sequentially in the order they are registered.
 * IMPORTANT: The `/search` route must be declared BEFORE the `/:id` wildcard route.
 * Otherwise, a request like GET `/api/content/search?q=banana` will match the `/:id` parameter,
 * treating "search" as the ID, resulting in a database lookup error or a 404 response.
 */

// Route to search and filter content items
router.get('/search', searchContent);

// Route to list all generated content items
router.get('/', listContent);

// Route to fetch a single item by ID
router.get('/:id', getContentById);

// Route to create a new content item (mock generation)
router.post('/', createContent);

// Route to update a content item by ID
router.put('/:id', updateContent);

// Route to delete a content item by ID
router.delete('/:id', deleteContent);

module.exports = router;
