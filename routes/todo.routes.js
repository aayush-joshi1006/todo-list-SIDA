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

const todoRoutes = express.Router();

todoRoutes.get("/", getAllTodos);
todoRoutes.get("/:id", getCurrentTodo);
todoRoutes.get("/completed", getCompletedTodos);
todoRoutes.post("/add", addTodo);
todoRoutes.delete("/delete/:id", deleteTodo);
todoRoutes.put("/edit/:id", editTodo);
todoRoutes.patch("/edit/status/:id", setStatus);

export default todoRoutes;
