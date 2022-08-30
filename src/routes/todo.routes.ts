// import { Router } from "express";
import express, { Express } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos/todo.controller";

const app: Express = express()
// const router: Router = Router()
app.get("/todos", getTodos)
app.post("/add-todo", addTodo)
app.put("/update-todo/:id", updateTodo)
app.delete("/delete-todo/:id", deleteTodo)

export default app

