import { z } from "zod";
import { baseUserSchema } from "./user.schema";

export const loginSchema = z.object({
  body: baseUserSchema,
});

export type LoginUser = z.infer<typeof loginSchema>;
