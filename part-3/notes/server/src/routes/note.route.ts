import {
  handleCreateNote,
  handleDeleteNote,
  handleGetNote,
  handleGetNotes,
  handleUpdateNote,
} from "@/controllers/note.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { noteInsertSchema, noteUpdateSchema } from "@/schemas/note.schema";
import { Router } from "express";

const noteRoute = Router();

noteRoute
  .route("/")
  .get(handleGetNotes)
  .post(validateSchema(noteInsertSchema), handleCreateNote);
noteRoute
  .route("/:id")
  .get(handleGetNote)
  .patch(validateSchema(noteUpdateSchema), handleUpdateNote)
  .delete(handleDeleteNote);

export default noteRoute;
