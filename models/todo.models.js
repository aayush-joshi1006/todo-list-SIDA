import mongoose from "mongoose";

// Define the schema for todos
const todoSchema = mongoose.Schema({
  title: { type: String, required: true }, // title is required
  description: { type: String, required: true }, // description is required
  isCompleted: { type: Boolean, default: false }, // completion status, default is false
});

// Create a model based on the schema
const todoModel = mongoose.model("Todo", todoSchema);

// Export the model for use in other files
export default todoModel;
