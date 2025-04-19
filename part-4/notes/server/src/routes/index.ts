import { Router } from "express";

import noteRoute from "./note.route";
import userRoute from "./user.route";

const apiRoute = Router();

apiRoute.use("/notes", noteRoute);
apiRoute.use("/users", userRoute);

export default apiRoute;
