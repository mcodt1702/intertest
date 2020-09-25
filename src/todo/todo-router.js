const express = require("express");
const TodoService = require("./todo-service");
const xss = require("xss");
const jsonParser = express.json();
const path = require("path");
const TodoRouter = express.Router();
const serializeTodo = (todo) => ({
  id: todo.id,
  title: xss(todo.title),
  completed: todo.completed,
});

TodoRouter.route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    TodoService.getTodos(knexInstance)
      .then((todos) => {
        res.json(todos.map(serializeTodo));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, completed = false } = req.body;
    const newTodo = { title };

    for (const [key, value] of Object.entries(newTodo))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    newTodo.completed = completed;

    TodoService.insertTodo(req.app.get("db"), newTodo)
      .then((todo) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${todo.id}`))
          .json(serializeTodo(todo));
      })
      .catch(next);
  });

module.exports = TodoRouter;
