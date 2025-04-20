import db from "@/db";
import { noteUsersTable } from "@/db/schema";
import { UserInsert } from "@/types/user.type";

export const createUser = async (payload: UserInsert) => {
  const [createdUser] = await db
    .insert(noteUsersTable)
    .values({ ...payload })
    .returning();

  return createdUser;
};

export const findAllUsers = async () => {
  return await db.select().from(noteUsersTable);
};
