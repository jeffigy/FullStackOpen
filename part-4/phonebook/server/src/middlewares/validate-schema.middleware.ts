import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

const validateSchema =
  (schema: ZodSchema<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body as unknown,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        for (const issue of error.issues) {
          res.status(400).json({ message: issue.message });
          return;
        }
      }
      next(error);
    }
  };

export default validateSchema;
