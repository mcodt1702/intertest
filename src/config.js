module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL: process.env.DB_URL || "postgresql://todo_user@localhost/todos",
  TEST_DB_URL: process.env.TEST_DB_URL || "postgresql://mac@localhost/interdb",
};
