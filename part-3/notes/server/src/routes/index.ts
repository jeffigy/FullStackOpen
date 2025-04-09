import { Router } from "express";
import noteRoute from "./note.route";

const apiRoute = Router();

apiRoute.use("/notes", noteRoute);

export default apiRoute;
