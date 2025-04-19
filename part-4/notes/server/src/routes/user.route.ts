import { handleLogin, handleSignup } from "@/controllers/user.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { createUserSchema } from "@/schemas/user.schema";
import { Router } from "express";

const userRoute = Router();

userRoute.route("/signup").post(validateSchema(createUserSchema), handleSignup);
userRoute.route("/login").post(handleLogin);

export default userRoute;
