import mongoose from "mongoose";
import todoModel from "../models/todo.models.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await todoModel.find();

    return res.status(200).json({ todos: todos });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCompletedTodos = async (req, res) => {
  try {
    const completedTodos = await todoModel.find({ isCompleted: true });

    return res.status(200).json({ completedTodos });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCurrentTodo = async (req, res) => {
  let currentId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(currentId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  try {
    const currentTodo = await todoModel.findById(currentId);
    if (!currentTodo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    return res.status(200).json(currentTodo);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addTodo = async (req, res) => {
  const { title, description, isCompleted } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and Description are required fields" });
  }

  let completedStatus = isCompleted || false;

  try {
    let newTodo = await todoModel.create({
      title: title.trim(),
      description: description.trim(),
      isCompleted: completedStatus,
    });

    return res
      .status(201)
      .json({ message: "Todod created successfully", newTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editTodo = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const setStatus = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  const currentId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(currentId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  try {
    const deletedTodo = await todoModel.findByIdAndDelete(currentId);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res
      .status(200)
      .json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
