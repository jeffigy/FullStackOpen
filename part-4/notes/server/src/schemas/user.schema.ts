import { string, z } from "zod";

const payload = {
  body: z.object({
    username: string({
      invalid_type_error: "Username must be a string",
      required_error: "Username is required",
    }),
    name: string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    }),
    password: string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    }),
  }),
};

export const createUserSchema = z.object({
  ...payload,
});
