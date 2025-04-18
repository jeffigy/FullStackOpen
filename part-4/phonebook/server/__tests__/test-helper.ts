import db from "@/db";
import { findAllPersons } from "@/services/person.service";
import { PersonInsert, PersonSelect } from "@/types/person.type";
import { reset } from "drizzle-seed";

export const initialPersons: PersonInsert[] = [
  {
    name: "Jon Doe",
    number: "09652326981",
  },
  {
    name: "Jane Doe",
    number: "098733329123",
  },
];

export const clearDb = async (schema: any) => {
  await reset(db, { schema });
};

export const personsInDb = async () => {
  return await findAllPersons();
};
