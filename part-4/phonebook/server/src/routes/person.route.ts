import {
  handleCreatePerson,
  handleDeletePerson,
  handleGetPerson,
  handleGetPersons,
  handleUpdatePerson,
} from "@/controllers/person.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import {
  createPersonSchema,
  updatePersonSchema,
} from "@/schemas/person.schema";
import { Router } from "express";

const personRoute = Router();

personRoute
  .route("/")
  .get(handleGetPersons)
  .post(validateSchema(createPersonSchema), handleCreatePerson);
personRoute
  .route("/:id")
  .get(handleGetPerson)
  .patch(validateSchema(updatePersonSchema), handleUpdatePerson)
  .delete(handleDeletePerson);

export default personRoute;
