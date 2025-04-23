import { string, z } from "zod";

export const baseUserSchema = z.object({
  password: string({
    invalid_type_error: "Password must be a string",
    required_error: "Password is required",
  }).min(1, "Password must contain at at least 1 character"),
  username: string({
    invalid_type_error: "Username must be a string",
    required_error: "Username is required",
  }).min(1, "Username must contain at at least 1 character"),
});

const extendedSchema = baseUserSchema.extend({
  name: string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required",
  }).min(1, "Name must contain at at least 1 character"),
});

export const createUserSchema = z.object({
  body: extendedSchema,
});

export type CreateUser = z.infer<typeof createUserSchema>;
