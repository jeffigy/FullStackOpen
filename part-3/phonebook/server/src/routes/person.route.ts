import {
  handleCreatePerson,
  handleDeletePerson,
  handleGetPerson,
  handleGetPersons,
  handleUpdatePerson,
} from "@/controllers/person.controller";
import { Router } from "express";

const personRoute = Router();

personRoute.route("/").get(handleGetPersons).post(handleCreatePerson);
personRoute
  .route("/:id")
  .get(handleGetPerson)
  .patch(handleUpdatePerson)
  .delete(handleDeletePerson);

export default personRoute;
