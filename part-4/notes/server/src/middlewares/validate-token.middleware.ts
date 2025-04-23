import { verifyAccessToken } from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  ) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  verifyAccessToken(token, req, res, next);
};

export default validateToken;
