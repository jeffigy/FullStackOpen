const Joi = require("joi");
const { getId } = require(".");

const notePayload = Joi.object({
  content: Joi.string().required().min(1).label("Content"),
  important: Joi.boolean().label("Important"),
});

const createNoteSchema = Joi.object({
  body: notePayload,
});

const updateNoteSchema = Joi.object({
  body: notePayload,
  params: getId,
});

module.exports = { createNoteSchema, updateNoteSchema };
