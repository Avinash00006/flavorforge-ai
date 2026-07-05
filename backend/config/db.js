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
    // Exit the Node process with a failure code (1) if the database fails to connect
    process.exit(1);
  }
};

module.exports = connectDB;
