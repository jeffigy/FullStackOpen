import { z } from "zod";

import { getParamsIdSchema } from ".";

const payload = {
  body: z.object({
    content: z
      .string({
        invalid_type_error: "Content must be a string",
        required_error: "Content is required",
      })
      .min(1),
    important: z.boolean().optional(),
  }),
};

export const createNoteSchema = z.object({
  ...payload,
});

export const updateNoteSchema = z.object({
  ...getParamsIdSchema,
  ...payload,
});

export type CreateNote = z.infer<typeof createNoteSchema>;
export type UpdateNote = z.infer<typeof updateNoteSchema>;
