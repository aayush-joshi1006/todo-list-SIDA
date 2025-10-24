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
    return res.status(400).json({ message: "Invalid Todo ID format" });
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
      .json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editTodo = async (req, res) => {
  let currentId = req.params.id;
  let { title, description, isCompleted } = req.body;

  if (!mongoose.Types.ObjectId.isValid(currentId)) {
    return res.status(400).json({ message: "Invalid Todo ID format" });
  }

  const updateFields = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ message: "Title must be a non-empty string" });
    }
    updateFields.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim() === "") {
      return res
        .status(400)
        .json({ message: "Description must be a non-empty string" });
    }
    updateFields.description = description.trim();
  }

  if (isCompleted !== undefined) {
    if (typeof isCompleted !== "boolean") {
      return res.status(400).json({ message: "isCompleted must be a boolean" });
    }
    updateFields.isCompleted = isCompleted;
  }

  if (Object.keys(updateFields).length === 0) {
    return res
      .status(400)
      .json({ message: "No valid fields provided for update" });
  }

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      todoId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const setStatus = async (req, res) => {
  const todoId = req.params.id;
  const { isCompleted } = req.body;

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({ message: "Invalid Todo ID format" });
  }

  if (typeof isCompleted !== "boolean") {
    return res
      .status(400)
      .json({ message: "isCompleted must be provided as a boolean" });
  }
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      todoId,
      { $set: { isCompleted } },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo status updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  const currentId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(currentId)) {
    return res.status(400).json({ message: "Invalid Todo ID format" });
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
