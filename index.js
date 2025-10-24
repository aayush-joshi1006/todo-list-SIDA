import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todo.routes.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

let app = express();
let PORT = process.env.PORT || 8000;

// Parse JSON data from request bodies
app.use(express.json());

// Use the todo routes for all requests starting with /api/todos
app.use("/api/todos", todoRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
