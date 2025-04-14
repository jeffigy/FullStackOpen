import {
  handleCreateNote,
  handleDeleteNote,
  handleGetNote,
  handleGetNotes,
  handleUpdateNote,
} from "@/controllers/note.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { createNoteSchema, updateNoteSchema } from "@/schemas/note.schema";
import { Router } from "express";

const noteRoute = Router();

noteRoute
  .route("/")
  .get(handleGetNotes)
  .post(validateSchema(createNoteSchema), handleCreateNote);
noteRoute
  .route("/:id")
  .get(handleGetNote)
  .patch(validateSchema(updateNoteSchema), handleUpdateNote)
  .delete(handleDeleteNote);

export default noteRoute;
