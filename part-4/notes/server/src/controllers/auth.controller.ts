import { NextFunction, Request, Response } from "express";
import { hash } from "bcryptjs";
import { createUser } from "@/services/auth.service";
import { LogIn, SignUp } from "@/schemas/auth.schema";

export const handleSignup = async (
  req: Request<unknown, unknown, SignUp["body"]>,
  res: Response,
  next: NextFunction
) => {
  const { username, name, password } = req.body;
  const passwordHash = await hash(password, 10);
  await createUser({ username, name, passwordHash });
  res.status(201).json({ message: "User created" });
};

export const handleLogin = async (
  req: Request<unknown, unknown, LogIn["body"]>,
  res: Response
) => {
  res.json(req.body);
};
