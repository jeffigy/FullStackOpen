import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let status = res.statusCode ?? 500;
  let message = error.message ?? "Something went wrong";
  console.log(error);

  if (error.code === "23505") {
    status = 409;
    message = "Duplicate entry";
  }

  res.status(status).json({ message });
};

export default errorHandler;
