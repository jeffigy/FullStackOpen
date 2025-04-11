import express, { json } from "express";
import { connectDb } from "./db";
import apiRoute from "./routes";

connectDb();

const app = express();

app.use(json());

app.use("/api", apiRoute);

export default app;
