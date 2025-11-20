const authRouter = require("./auth");
const numerologyRouter = require("./numerology");
const todoRouter = require("./todo");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/numerology", numerologyRouter);
  app.use("/api/todo", todoRouter);
}

module.exports = route;

