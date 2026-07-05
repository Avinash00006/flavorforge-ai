/**
 * FlavorForge AI - Backend Express Server Entry Point
 * 
 * This server handles business logic, mock data storage, and content manipulation.
 * Developed for the TBI-GEU Summer Internship 2026.
 * 
 * Tech Stack: Express.js, Node.js, Cors, Dotenv
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

// Import modular routes and middlewares
const contentRoutes = require('./routes/contentRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Initialize the Express Application
const app = express();

// Connect to Database
connectDB();

// Determine the port to listen on (from .env or fallback to 5000)
const PORT = process.env.PORT || 5000;

/**
 * Configure Middleware
 */

// Enable Cross-Origin Resource Sharing (CORS)
// This is critical because our Next.js frontend runs on http://localhost:3000,
// and without CORS configuration, modern web browsers will block API calls
// to our http://localhost:5000 backend server due to Same-Origin Policy.
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Express built-in body-parser middleware to parse incoming HTTP JSON request bodies
app.use(express.json());

/**
 * Register API Routes
 */

// All content management requests are handled under the /api/content base path
app.use('/api/content', contentRoutes);

// Simple health check root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to FlavorForge AI API",
    version: "1.0.0",
    status: "Healthy"
  });
});

/**
 * Register Error Handling Middleware
 */

// Global error handler must be registered AFTER all routing and normal middleware definitions
// so that any errors thrown in controllers get caught and handled gracefully.
app.use(errorHandler);

/**
 * Start Server Listener
 */
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 FlavorForge AI Backend API is running!`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 Allowed Origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`===================================================`);
});
