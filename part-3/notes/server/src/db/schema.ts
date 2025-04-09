import { createId } from "@paralleldrive/cuid2";
import { boolean } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  noteId: varchar("note_id").primaryKey().$defaultFn(createId),
  content: text("content").notNull(),
  important: boolean("important").default(false).notNull(),
});
