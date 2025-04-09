import { createId } from "@paralleldrive/cuid2";
import {
  timestamp,
  boolean,
  text,
  varchar,
  pgTable,
} from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  noteId: varchar("note_id").primaryKey().$defaultFn(createId),
  content: text("content").notNull(),
  important: boolean("important").default(false).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
