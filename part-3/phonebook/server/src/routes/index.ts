import { Router } from "express";
import personRoute from "./person.route";

const apiRoute = Router();

apiRoute.use("/persons", personRoute);

export default apiRoute;
