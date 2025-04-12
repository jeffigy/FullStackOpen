import { z } from "zod";

export const noteInsertSchema = z.object({
  body: z.object({
    content: z
      .string({
        invalid_type_error: "Content must be a string",
        required_error: "Content is required",
      })
      .min(1),
    important: z.boolean().optional(),
  }),
});

export const noteUpdateSchema = noteInsertSchema.extend({
  params: z.object({
    id: z
      .string({
        invalid_type_error: "Id must be a string",
        required_error: "Id is required",
      })
      .min(1),
  }),
});
