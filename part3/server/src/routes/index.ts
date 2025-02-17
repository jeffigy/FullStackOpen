import { Router } from "express";
import noteRoutes from "./note.routes";

const apiRoutes = Router();

apiRoutes.use("/notes", noteRoutes);

export default apiRoutes;
