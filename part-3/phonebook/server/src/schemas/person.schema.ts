import z from "zod";

export const personInsertSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1),
    number: z
      .string({
        required_error: "Number is required",
        invalid_type_error: "Number must be a string",
      })
      .min(1),
  }),
});
