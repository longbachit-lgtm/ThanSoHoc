const authRouter = require("./auth");
const numerologyRouter = require("./numerology");
const todoRouter = require("./todo");
const registrationCodeRouter = require("./registrationCode");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/numerology", numerologyRouter);
  app.use("/api/todo", todoRouter);
  app.use("/api/registration-code", registrationCodeRouter);
}

module.exports = route;

