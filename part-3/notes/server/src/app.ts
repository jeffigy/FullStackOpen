import express, { json } from "express";
import apiRoute from "./routes";

const app = express();

app.use(json());

app.use("/api", apiRoute);

export default app;
