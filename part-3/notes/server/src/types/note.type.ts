import { notesTable } from "@/db/schema";

export type NoteInsert = typeof notesTable.$inferInsert;
export type NoteSelect = typeof notesTable.$inferSelect;
