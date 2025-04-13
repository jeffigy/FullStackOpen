import { createId } from "@paralleldrive/cuid2";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const personsTable = pgTable("persons", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
  name: varchar("name", { length: 255 }).notNull(),
  number: varchar("number", { length: 255 }).notNull(),
});
