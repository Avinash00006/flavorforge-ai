/**
 * Passport Google OAuth Strategy Configuration
 * 
 * Configures Passport.js with the Google Strategy to support social authentication.
 * If a user logs in successfully via Google:
 * 1. It checks if a user with that googleId already exists.
 * 2. If not, it checks if a user with the same email exists and links the googleId.
 * 3. Otherwise, it creates a new User document in MongoDB without password credentials.
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        const googleId = profile.id;
        const name = profile.displayName || 'Google User';

        if (!email) {
          return done(new Error('Google authentication failed: Email profile not returned.'), null);
        }

        // 1. Check if user already exists with this googleId
        let user = await User.findOne({ googleId });
        if (user) {
          return done(null, user);
        }

        // 2. Check if user already exists with the same email (standard registration)
        user = await User.findOne({ email });
        if (user) {
          // Link the googleId to the existing user profile
          user.googleId = googleId;
          await user.save();
          return done(null, user);
        }

        // 3. Create a new user profile since they don't exist in our database
        user = await User.create({
          googleId,
          email,
          name
          // Password remains undefined since they authenticate via Google OAuth
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
