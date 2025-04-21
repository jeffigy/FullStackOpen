import { Router } from "express";

import userRoute from "./user.route";
import noteRoute from "./note.route";

const apiRoute = Router();

apiRoute.use("/notes", noteRoute);
apiRoute.use("/users", userRoute);

export default apiRoute;
