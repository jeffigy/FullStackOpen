import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { createUser } from "@/services/user.service";
export const handleSignup = async (req: Request, res: Response) => {
  const { username, name, password } = req.body;

  const passwordHash = await hash(password, 10);

  await createUser({ username, name, passwordHash });

  res.status(201).json({ message: "User created" });
};
export const handleLogin = async (req: Request, res: Response) => {};
