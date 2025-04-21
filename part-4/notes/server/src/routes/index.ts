import { Router } from "express";

import userRoute from "./auth.route";
import noteRoute from "./note.route";

const apiRoute = Router();

apiRoute.use("/notes", noteRoute);
apiRoute.use("/auth", userRoute);

export default apiRoute;
