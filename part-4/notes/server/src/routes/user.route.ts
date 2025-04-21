import {
  handleCreateUser,
  handleGetUsers,
} from "@/controllers/user.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { createUserSchema } from "@/schemas/user.schema";
import { Router } from "express";

const userRoute = Router();

userRoute
  .route("/")
  .get(handleGetUsers)
  .post(validateSchema(createUserSchema), handleCreateUser);

export default userRoute;
