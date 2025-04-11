import express, { json } from "express";
import apiRoute from "./routes";
import { connectDb } from "./db";

connectDb();

const app = express();

app.use(json());

app.use("/api", apiRoute);

export default app;
