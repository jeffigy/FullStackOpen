import db from "@/db";
import { notesTable, noteUsersTable } from "@/db/schema";
import { UserInsert } from "@/types/user.type";
import { eq } from "drizzle-orm";

export const createUser = async (payload: UserInsert) => {
  const [createdUser] = await db
    .insert(noteUsersTable)
    .values({ ...payload })
    .returning();

  return createdUser;
};

export const findAllUsers = async () => {
  return await db
    .select()
    .from(noteUsersTable)
    .leftJoin(notesTable, eq(noteUsersTable.userId, notesTable.userId));
};
