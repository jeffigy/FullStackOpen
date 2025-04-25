const { Router } = require("express");
const {
  handleGetNotes,
  handleCreateNote,
  handleGetNote,
  handleUpdateNote,
  handleDeleteNote,
} = require("../controllers/note.controller");
const validateSchema = require("../middlewares/validate-schema.middleware");
const {
  createNoteSchema,
  updateNoteSchema,
} = require("../schemas/note.schema");
const { getParamsIdSchema } = require("../schemas");

const noteRoutes = Router();

noteRoutes
  .route("/")
  .get(handleGetNotes)
  .post(validateSchema(createNoteSchema), handleCreateNote);
noteRoutes
  .route("/:id")
  .get(validateSchema(getParamsIdSchema), handleGetNote)
  .patch(validateSchema(updateNoteSchema), handleUpdateNote)
  .delete(validateSchema(getParamsIdSchema), handleDeleteNote);

module.exports = noteRoutes;
