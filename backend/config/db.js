/**
 * Database Connection Utility
 * 
 * Sets up and manages the lifecycle of the connection to the MongoDB database
 * using the Mongoose ODM library.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect using the URI stored safely in environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`===================================================`);
    console.log(`📡 MongoDB Connection Successful!`);
    console.log(`💾 Host: ${conn.connection.host}`);
    console.log(`🗄️ Database Name: ${conn.connection.name}`);
    console.log(`===================================================`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failure: ${error.message}`);
    console.warn(`⚠️ Server is running without active database connection. Update MONGODB_URI in .env when ready.`);
  }
};

module.exports = connectDB;
