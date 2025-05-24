import { addTodo, getTodos, deleteTodo } from "../models/todoModel.js";
import { summarizeTodos } from "../services/summaryService.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (error) {
    console.error("Error in getAllTodos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const newTodo = await addTodo(title);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error in createTodo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const deleteTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTodo(id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Error in deleteTodoById:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

export const summarizeAndSend = async (req, res) => {
  try {
    const todos = await getTodos();
    const summary = await summarizeTodos(todos);
    res.json({ summary });
  } catch (error) {
    console.error("Error in summarizeAndSend:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: error.message });
  }
};