const express = require("express");
const apiRoutes = require("./routes");
const connectDb = require("./utils/connect-db.util");
const errorHandler = require("./middlewares/error-handler.middleware");

connectDb();

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
  return res.status(404).json({ message: "Resource not found" });
});

module.exports = app;
