import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  important: boolean("important").default(false).notNull(),
  noteId: varchar("note_id").primaryKey().$defaultFn(createId),
});
