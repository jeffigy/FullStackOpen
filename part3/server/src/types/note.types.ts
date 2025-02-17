import { notesTable } from "../db/schema/notes";

export type SelectNote = typeof notesTable.$inferSelect;
export type InsertNote = typeof notesTable.$inferInsert;
