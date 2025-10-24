import express from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getAllTodos,
  getCompletedTodos,
  getCurrentTodo,
  setStatus,
} from "../controllers/todo.controllers.js";

// Create a router for todo routes
const todoRoutes = express.Router();

// Get all todos
todoRoutes.get("/", getAllTodos);

// Get all completed todos
todoRoutes.get("/completed", getCompletedTodos);

// Get a specific todo by id
todoRoutes.get("/:id", getCurrentTodo);

// Add a new todo
todoRoutes.post("/add", addTodo);

// Delete a todo by id
todoRoutes.delete("/delete/:id", deleteTodo);

// Edit a todo by id
todoRoutes.put("/edit/:id", editTodo);

// Update only the status of a todo by id
todoRoutes.patch("/edit/status/:id", setStatus);

// Export the router
export default todoRoutes;
