import { z } from "zod";

export const noteInsertSchema = z.object({
  body: z.object({
    content: z
      .string({
        required_error: "Content is required",
        invalid_type_error: "Content must be a string",
      })
      .min(1),
    important: z.boolean().optional(),
  }),
});
