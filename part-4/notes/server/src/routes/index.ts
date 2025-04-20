import { Router } from "express";

import noteRoute from "./note.route";
import userRoute from "./auth.route";

const apiRoute = Router();

apiRoute.use("/notes", noteRoute);
apiRoute.use("/auth", userRoute);

export default apiRoute;
