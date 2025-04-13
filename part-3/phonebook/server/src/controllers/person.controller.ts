import { CreatePerson, UpdatePerson } from "@/schemas/person.schema";
import {
  createPerson,
  deletePerson,
  findAllPersons,
  findPersonById,
  updatePerson,
} from "@/services/person.service";
import { Request, Response } from "express";

export const handleGetPersons = async (req: Request, res: Response) => {
  const persons = await findAllPersons();

  if (persons.length === 0) {
    res.status(404).json({ message: "No person found" });
    return;
  }

  res.json(persons);
};

export const handleGetPerson = async (req: Request, res: Response) => {
  const { id } = req.params;

  const person = await findPersonById(id);

  if (!person) {
    res.status(404).json({ message: "Person not found" });
    return;
  }

  res.json(person);
};

export const handleCreatePerson = async (
  req: Request<unknown, unknown, CreatePerson["body"]>,
  res: Response
) => {
  await createPerson(req.body);

  res.status(201).json({ message: "Person created" });
};

export const handleUpdatePerson = async (
  req: Request<UpdatePerson["params"], unknown, UpdatePerson["body"]>,
  res: Response
) => {
  const { id } = req.params;
  const value = req.body;

  const foundPerson = await findPersonById(id);

  if (!foundPerson) {
    res.status(404).json({ message: "Person not found" });
    return;
  }

  await updatePerson(value, id);

  res.json({ message: "Person updated" });
};

export const handleDeletePerson = async (req: Request, res: Response) => {
  const { id } = req.params;

  const foundPerson = await findPersonById(id);

  if (!foundPerson) {
    res.status(404).json({ message: "Person not found" });
    return;
  }

  await deletePerson(id);

  res.json({ message: "Person deleted" });
};
