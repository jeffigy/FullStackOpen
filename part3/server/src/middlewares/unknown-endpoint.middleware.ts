import type { Request, Response } from "express";

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).json({ message: "unknown endpoint" });
};

export default unknownEndpoint;
