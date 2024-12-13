import express from "express";
import todoController from "../Controllers/todoController.js";
import auth from "../middlewares/Auth.js";

const todoRoute = express.Router()
todoRoute.post('/', auth.isAuth, todoController.createTodo)
todoRoute.get('/', auth.isAuth, todoController.listTodo)
todoRoute.put('/', auth.isAuth, todoController.updateTodo)
todoRoute.delete('/:id', auth.isAuth, todoController.deleteTodoById)

todoRoute.get('/completed', auth.isAuth, todoController.filterByCompleted)
todoRoute.get('/notCompleted', auth.isAuth, todoController.filterByNotCompleted)

export default todoRoute