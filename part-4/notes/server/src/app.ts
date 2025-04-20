import "express-async-errors";
import express, { json } from "express";

import errorHandler from "./middlewares/error-handler.middleware";
import apiRoute from "./routes";

const app = express();

app.use(json());

app.use("/api", apiRoute);

app.use(errorHandler);

export default app;
