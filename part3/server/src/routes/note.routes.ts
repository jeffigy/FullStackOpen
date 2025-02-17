import { Router } from "express";
import {
  deleteNote,
  getNote,
  getNotes,
  newNote,
  updateNote,
} from "../controllers/note.controller";

const noteRoutes = Router();

noteRoutes.route("/").get(getNotes).post(newNote);
noteRoutes.route("/:id").get(getNote).patch(updateNote).delete(deleteNote);

export default noteRoutes;
