import {
  createNote,
  deleteNote,
  findAllNotes,
  findNoteById,
  updateNote,
} from "@/services/note.service";
import { NoteInsert } from "@/types/note.type";
import { Request, Response } from "express";

export const handleGetNotes = async (req: Request, res: Response) => {
  const notes = await findAllNotes();

  if (notes.length === 0) {
    res.status(404).json({ message: "No notes found" });
    return;
  }

  res.json(notes);
};

export const handleGetNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }

  const note = await findNoteById(id);

  if (!note) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  res.json(note);
};

export const handleCreateNote = async (
  req: Request<unknown, unknown, NoteInsert>,
  res: Response
) => {
  await createNote(req.body);

  res.status(201).json({ message: "Note created" });
};

export const handleUpdateNote = async (
  req: Request<{ id: string }, unknown, NoteInsert>,
  res: Response
) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }

  if (!content) {
    res.status(400).json({ message: "Content is required" });
    return;
  }

  await updateNote(req.body, id);

  res.json({ message: "Note updated" });
};

export const handleDeleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }

  const note = await findNoteById(id);

  if (!note) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  await deleteNote(id);

  res.json({ message: "Note deleted" });
};
