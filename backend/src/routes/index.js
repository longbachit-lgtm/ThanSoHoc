const authRouter = require("./auth");
const numerologyRouter = require("./numerology");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/numerology", numerologyRouter);
}

module.exports = route;

