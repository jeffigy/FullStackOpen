import db from "@/db";
import { notesTable } from "@/db/schema";
import { NoteInsert } from "@/types/note.type";
import { eq } from "drizzle-orm";

export const findAllNotes = async () => {
  return await db.select().from(notesTable);
};

export const findNoteById = async (noteId: string) => {
  const [note] = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.noteId, noteId));

  return note;
};

export const createNote = async (value: NoteInsert) => {
  const [createdNote] = await db
    .insert(notesTable)
    .values({ ...value })
    .returning();

  return createdNote;
};

export const updateNote = async (value: NoteInsert, noteId: string) => {
  const [updatedNote] = await db
    .update(notesTable)
    .set({ ...value })
    .where(eq(notesTable.noteId, noteId))
    .returning();

  return updatedNote;
};

export const deleteNote = async (noteId: string) => {
  const [deletedNote] = await db
    .delete(notesTable)
    .where(eq(notesTable.noteId, noteId))
    .returning();

  return deletedNote;
};
