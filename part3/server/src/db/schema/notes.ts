import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  noteId: varchar("note_id").primaryKey().$defaultFn(createId),
  content: text().notNull(),
  date: timestamp().notNull().defaultNow(),
  important: boolean().default(false),
});
