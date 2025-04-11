import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validateSchema =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
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
