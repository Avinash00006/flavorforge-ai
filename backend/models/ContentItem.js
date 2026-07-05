/**
 * ContentItem Schema Model
 * 
 * Defines the structure of the ContentItem entity in MongoDB.
 * Holds product title, type, inputs (ingredients, tone, audience),
 * the generated text output from the AI, publishing status, and
 * a reference link to the User creator (userId).
 */

const mongoose = require('mongoose');

const ContentItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is a required field"],
    trim: true
  },
  type: {
    type: String,
    required: [true, "Type is a required field"],
    enum: {
      values: ['description', 'branding', 'marketing'],
      message: "Type must be either: 'description', 'branding', or 'marketing'"
    }
  },
  description: {
    type: String,
    trim: true
  },
  ingredients: {
    type: String,
    trim: true
  },
  targetAudience: {
    type: String,
    trim: true
  },
  tone: {
    type: String,
    default: 'Engaging',
    trim: true
  },
  generatedText: {
    type: String,
    required: [true, "GeneratedText is a required field"]
  },
  status: {
    type: String,
    enum: {
      values: ['draft', 'published'],
      message: "Status must be either: 'draft' or 'published'"
    },
    default: 'draft'
  },
  // Relational Reference linking this ContentItem to a specific User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Matches the name of the User model exports
    required: false // Optional for now since auth runs next week
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Automatically include virtual getters (like 'id' mapped from '_id') in JSON outputs
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('ContentItem', ContentItemSchema);
