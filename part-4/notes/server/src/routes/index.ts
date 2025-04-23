import { Router } from "express";

import userRoute from "./user.route";
import noteRoute from "./note.route";
import authRoute from "./auth.route";
import validateToken from "@/middlewares/validate-token.middleware";

const apiRoute = Router();

apiRoute.use("/notes", validateToken, noteRoute);
apiRoute.use("/users", userRoute);
apiRoute.use("/auth", authRoute);

export default apiRoute;
