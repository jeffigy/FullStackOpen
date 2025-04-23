import { ACCESS_TOKEN_SECRET } from "@/config/env.config";
import { DecodedToken } from "@/types/auth.type";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

export const generateAccessToken = (payload: unknown) => {
  return sign({ userInfo: payload }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const verifyAccessToken = (
  token: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verify(token, ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.userId = (decoded as DecodedToken).userInfo.userId;

    next();
  });
};
