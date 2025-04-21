import { CreateUser } from "@/schemas/user.schema";
import { createUser, findAllUsers } from "@/services/user.service";
import { hash } from "bcryptjs";
import { Request, Response } from "express";

export const handleGetUsers = async (req: Request, res: Response) => {
  const users = await findAllUsers();

  if (users.length === 0) {
    res.status(404).json({ message: "No users found" });
  }

  res.json(users);
};

export const handleCreateUser = async (
  req: Request<unknown, unknown, CreateUser["body"]>,
  res: Response
) => {
  const { name, password, username } = req.body;
  const passwordHash = await hash(password, 10);
  await createUser({ name, passwordHash, username });
  res.status(201).json({ message: "User created" });
};
