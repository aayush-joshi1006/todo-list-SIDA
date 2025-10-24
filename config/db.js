import mongoose from "mongoose";

// Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection error ", error);
    process.exit(1); // exit process if connection fails
  }
};

// Export the connection function for use in other files
export default connectDB;
