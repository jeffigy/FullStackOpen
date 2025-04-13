import { z } from "zod";

import { getParamsIdSchema } from ".";

export const payload = {
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      })
      .min(1),
    number: z
      .string({
        invalid_type_error: "Number must be a string",
        required_error: "Number is required",
      })
      .min(1),
  }),
};

export const createPersonSchema = z.object({
  ...payload,
});

export const updatePersonSchema = z.object({
  ...payload,
  ...getParamsIdSchema,
});

export type CreatePerson = z.infer<typeof createPersonSchema>;
export type UpdatePerson = z.infer<typeof updatePersonSchema>;
