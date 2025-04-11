import { notesTable } from "@/db/schema";

export type NoteSelect = typeof notesTable.$inferSelect;
export type NoteInsert = typeof notesTable.$inferInsert;
