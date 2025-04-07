import { Router } from "express";
import {
  handleCreateProcedure,
  handleDeleteProcedure,
  handleGetProcedure,
  handleGetProcedures,
  handleUpdateProcedure,
} from "../controllers/note.controller.mjs";

const noteRoute = Router();

noteRoute.route("/").get(handleGetProcedures).post(handleCreateProcedure);
noteRoute
  .route("/:id")
  .get(handleGetProcedure)
  .patch(handleUpdateProcedure)
  .delete(handleDeleteProcedure);

export default noteRoute;
