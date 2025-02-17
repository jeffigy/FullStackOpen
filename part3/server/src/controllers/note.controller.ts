import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import db from "../db";
import { notesTable } from "../db/schema/notes";

export const getNotes = async (req: Request, res: Response) => {
  const notes = await db.select().from(notesTable);

  if (notes.length === 0) {
    res.status(404).json({ message: "No notes found" });
    return;
  }

  res.json(notes);
};

export const newNote = async (req: Request, res: Response) => {
  const { content, important } = req.body;

  if (!content) {
    res.status(400).json({ message: "Content is required" });
    return;
  }

  const newNote = await db
    .insert(notesTable)
    .values({ content, important })
    .returning();

  console.log(newNote);

  if (!newNote) {
    res.status(500).json({ message: "Something went wrong " });
    return;
  }

  res.json(newNote);
};

export const getNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const note = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.noteId, id));

  if (note.length === 0) {
    res.status(404).json({ message: "Note not found" });
    return;
  }
  res.json(note[0]);
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, important } = req.body;
  const note = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.noteId, id));

  if (note.length === 0) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  await db
    .update(notesTable)
    .set({ content, important })
    .where(eq(notesTable.noteId, id));

  res.json({ message: "Note successfully updated" });
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const note = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.noteId, id));

  if (note.length === 0) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  await db.delete(notesTable).where(eq(notesTable.noteId, id));

  res.json({ message: "Note deleted" });
};
