import { Router } from "express";
import noteRoute from "./note.routes.mjs";

const apiRoute = Router();

apiRoute.use("/notes", noteRoute);

export default apiRoute;
