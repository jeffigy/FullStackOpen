const Joi = require("joi");

const getId = Joi.object({
  id: Joi.string().length(24).hex().required().label("Id").messages({
    "string.length": `Invalid {{#label}}`,
    "string.hex": `Invalid {{#label}} `,
    "any.required": `{{#label}} is required`,
  }),
});

const getParamsIdSchema = Joi.object({
  params: getId,
});

module.exports = { getId, getParamsIdSchema };
