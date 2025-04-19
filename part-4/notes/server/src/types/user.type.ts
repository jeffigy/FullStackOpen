import { noteUsersTable } from "@/db/schema";

export type UserInsert = typeof noteUsersTable.$inferInsert;
export type UserSelect = typeof noteUsersTable.$inferSelect;
