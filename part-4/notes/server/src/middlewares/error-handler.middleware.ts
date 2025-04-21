import { NextFunction, Request, Response } from "express";

// Define a custom error interface for expected properties
interface CustomError extends Error {
  code?: string;
}

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const status = res.statusCode || 500;
  let message = error.message || "Something went wrong";

  if (error.code === "23505") {
    // PostgreSQL unique violation
    message = "Duplicate entry";
    res.status(409).json({ message });
    return;
  }

  res.status(status).json({ message });
};

export default errorHandler;
