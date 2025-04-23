import { LoginUser } from "@/schemas/auth.schema";
import { generateAccessToken } from "@/services/auth.service";
import { findUserByUsername } from "@/services/user.service";
import { compare } from "bcryptjs";
import { Request, Response } from "express";

export const handleLogin = async (
  req: Request<unknown, unknown, LoginUser["body"]>,
  res: Response
) => {
  const { username, password } = req.body;

  const existedUser = await findUserByUsername(username);

  if (!existedUser) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  const matchPwd = await compare(password, existedUser.note_users.passwordHash);

  if (!matchPwd) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  const token = generateAccessToken({
    username: existedUser.note_users.username,
    userId: existedUser.note_users.userId,
  });

  res.json({ token });
};
