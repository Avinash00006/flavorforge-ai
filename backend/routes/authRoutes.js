/**
 * Authentication Routes Router
 * 
 * Exposes endpoints for user registration, credentials-based login,
 * and Passport Google OAuth integration.
 * Performs body validations using Zod schemas and hashes passwords with bcryptjs.
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const passport = require('passport');
const User = require('../models/User');

// Initialize Zod validation schemas
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).trim(),
  email: z.string().email({ message: 'Please provide a valid email address' }).trim().toLowerCase(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Please provide a valid email address' }).trim().toLowerCase(),
  password: z.string().min(1, { message: 'Password is required' })
});

/**
 * 1. POST /api/auth/register
 * Registers a new user with an email and password.
 */
router.post('/register', async (req, res, next) => {
  try {
    // Validate request body using Zod schema
    const validationResult = registerSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.errors.map(err => err.message).join(', ');
      const error = new Error(`Validation Error: ${errorMsg}`);
      error.statusCode = 400;
      return next(error);
    }

    const { name, email, password } = validationResult.data;

    // Check if email already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('Email is already registered. Please choose another or log in.');
      error.statusCode = 400; // Bad Request
      return next(error);
    }

    // Hash the password (10 salt rounds is recommended and performant)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user document
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Strip password from the response
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully. You can now log in.',
      data: userResponse
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 2. POST /api/auth/login
 * Validates credentials and returns a signed JWT token on success.
 */
router.post('/login', async (req, res, next) => {
  try {
    // Validate login request body
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.errors.map(err => err.message).join(', ');
      const error = new Error(`Validation Error: ${errorMsg}`);
      error.statusCode = 400;
      return next(error);
    }

    const { email, password } = validationResult.data;

    // Retrieve user from the database
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Invalid email or password credentials.');
      error.statusCode = 401; // Unauthorized
      return next(error);
    }

    // Ensure the user has password credentials (e.g. didn't sign up via Google only)
    if (!user.password) {
      const error = new Error('This account was created via Google Login. Please sign in using Google.');
      error.statusCode = 400;
      return next(error);
    }

    // Verify hashed password matches incoming password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      const error = new Error('Invalid email or password credentials.');
      error.statusCode = 401;
      return next(error);
    }

    // Sign the JWT token (expires in 7 days)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 3. GET /api/auth/google
 * Initiates the Google OAuth login redirect flow.
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false // Sessionless JWT strategy
  })
);

/**
 * 4. GET /api/auth/google/callback
 * Handles Google redirection callback. Generates JWT and redirects to frontend dashboard.
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=OAuthFailed`,
    session: false
  }),
  (req, res) => {
    // Generate JWT token for the authenticated user returned by passport
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    // Redirect user back to the Next.js frontend with the JWT in query parameters
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?token=${token}&email=${encodeURIComponent(req.user.email)}&name=${encodeURIComponent(req.user.name)}`;
    res.redirect(redirectUrl);
  }
);

module.exports = router;
