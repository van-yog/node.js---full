require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Get the User model to access the collection
    const User = require("../models/User");
    
    // Drop the old 'name_1' index if it exists
    try {
      await User.collection.dropIndex("name_1");
      console.log("Successfully dropped 'name_1' index");
    } catch (error) {
      if (error.code === 27) {
        console.log("Index 'name_1' does not exist - nothing to drop");
      } else {
        console.log("Error dropping index:", error.message);
      }
    }
    
    // List all indexes to verify
    const indexes = await User.collection.getIndexes();
    console.log("Current indexes:", indexes);
    
    process.exit(0);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};

connectDB();
