import {
  handleCreateNote,
  handleDeleteNote,
  handleGetNote,
  handleGetNotes,
  handleUpdateNote,
} from "@/controllers/note.controller";
import { Router } from "express";

const noteRoute = Router();

noteRoute.route("/").get(handleGetNotes).post(handleCreateNote);
noteRoute
  .route("/:id")
  .get(handleGetNote)
  .patch(handleUpdateNote)
  .delete(handleDeleteNote);

export default noteRoute;
