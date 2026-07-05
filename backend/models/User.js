/**
 * User Schema Model
 * 
 * Defines the structure of the User entity in MongoDB.
 * It contains properties such as name, email, password, and timestamps.
 * email is marked as unique to prevent duplicate accounts.
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"]
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    unique: true, // Ensures email uniqueness in the database index
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is a required field"]
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically logs creation date
  }
});

// Export the Mongoose Model compiled from the Schema
module.exports = mongoose.model('User', UserSchema);
