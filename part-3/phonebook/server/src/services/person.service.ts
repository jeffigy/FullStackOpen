import db from "@/db";
import { personsTable } from "@/db/schema";
import { PersonInsert } from "@/types/person.type";
import { eq } from "drizzle-orm";

export const findAllPersons = async () => {
  return await db.select().from(personsTable);
};

export const findPersonById = async (personId: string) => {
  const [person] = await db
    .select()
    .from(personsTable)
    .where(eq(personsTable.id, personId));

  return person;
};

export const createPerson = async (value: PersonInsert) => {
  const [createdPerson] = await db
    .insert(personsTable)
    .values({ ...value })
    .returning();

  return createdPerson;
};

export const updatePerson = async (value: PersonInsert, personId: string) => {
  const [updatedPerson] = await db
    .update(personsTable)
    .set({ ...value })
    .where(eq(personsTable.id, personId))
    .returning();

  return updatedPerson;
};

export const deletePerson = async (personId: string) => {
  const [deletedPerson] = await db
    .delete(personsTable)
    .where(eq(personsTable.id, personId))
    .returning();

  return deletedPerson;
};
