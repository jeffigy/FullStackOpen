import { LogIn, SignUp } from "@/schemas/auth.schema";
import { createUser } from "@/services/auth.service";
import { hash } from "bcryptjs";
import { Request, Response } from "express";

export const handleSignup = async (
  req: Request<unknown, unknown, SignUp["body"]>,
  res: Response
) => {
  const { name, password, username } = req.body;
  const passwordHash = await hash(password, 10);
  await createUser({ name, passwordHash, username });
  res.status(201).json({ message: "User created" });
};

export const handleLogin = async (
  req: Request<unknown, unknown, LogIn["body"]>,
  res: Response
) => {
  res.json(req.body);
};
