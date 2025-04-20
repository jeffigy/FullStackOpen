import { handleLogin, handleSignup } from "@/controllers/auth.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { logInSchema, signUpSchema } from "@/schemas/auth.schema";
import { Router } from "express";

const authRoute = Router();

authRoute.route("/signup").post(validateSchema(signUpSchema), handleSignup);
authRoute.route("/login").post(validateSchema(logInSchema), handleLogin);

export default authRoute;
