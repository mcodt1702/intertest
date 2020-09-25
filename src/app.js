require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./middleware/error-handler");
const TodoService = require("./todo/todo-service");
const xss = require("xss");
const jsonParser = express.json();
const path = require("path");
const TodoRouter = require("./todo/todo-router");
const TodoRouter2 = require("./todo/todo-router2");
const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(
  morgan(morganOption, {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());

app.use(express.static("public"));

app.use("/v1/todos", TodoRouter);
app.use("/v1/todos/:todo_id", TodoRouter2);
app.use(errorHandler);

module.exports = app;
