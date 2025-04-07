import express, { json } from "express";
import apiRoute from "./routes/index.mjs";

const app = express();

app.use(json());

app.use("/api", apiRoute);

export default app;
