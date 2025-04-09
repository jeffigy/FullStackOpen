import express, { json } from "express";
import { connectDb } from "./db";

connectDb();

const app = express();

app.use(json());

export default app;
