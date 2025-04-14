import { personsTable } from "@/db/schema";

export type PersonInsert = typeof personsTable.$inferInsert;
export type PersonSelect = typeof personsTable.$inferSelect;
