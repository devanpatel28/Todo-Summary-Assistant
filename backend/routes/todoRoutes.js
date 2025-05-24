import express from "express";
import { getAllTodos, createTodo, deleteTodoById, summarizeAndSend } from "../controllers/todoController.js";

const router = express.Router();

router.get("/todos", getAllTodos);
router.post("/todos", createTodo);
router.delete("/todos/:id", deleteTodoById);
router.post("/summarize", summarizeAndSend);

export default router;