import "express-async-errors";
import cors from "cors";
import express, { json } from "express";
import { connectDb } from "./db";
import errorHandler from "./middlewares/error-handler.middlware";
import unknownEndpoint from "./middlewares/unknown-endpoint.middleware";
import apiRoutes from "./routes";

connectDb();

const app = express();

app.use(cors());
app.use(json());

app.use("/api", apiRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
