import { handleLogin } from "@/controllers/auth.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { loginSchema } from "@/schemas/auth.schema";
import { Router } from "express";

const authRoute = Router();

authRoute.route("/login").post(validateSchema(loginSchema), handleLogin);

export default authRoute;
