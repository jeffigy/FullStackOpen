const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        {
          allowUnknown: true,
          stripUnknown: true,
          abortEarly: false,
        }
      );

      if (value.body) req.body = value.body;
      if (value.params) req.params = value.params;
      if (value.query) req.query = value.query;

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateSchema;
