import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const noteUsersTable = pgTable("note_users", {
  name: text("name").notNull(),
  passwordHash: text("passwordHash").notNull(),
  userId: text("user_id").primaryKey().$defaultFn(createId),
  username: text("username").unique().notNull(),
});

export const noteUsersRelations = relations(noteUsersTable, ({ many }) => ({
  notes: many(notesTable),
}));

export const notesTable = pgTable("notes", {
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  important: boolean("important").default(false).notNull(),
  noteId: varchar("note_id").primaryKey().$defaultFn(createId),
  userId: text("user_id"),
});

export const notesRelations = relations(notesTable, ({ one }) => ({
  user: one(noteUsersTable, {
    fields: [notesTable.userId],
    references: [noteUsersTable.userId],
  }),
}));
