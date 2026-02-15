export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);

      // overwrite body with validated & sanitized data
      req.body = validatedData;

      next();
    } catch (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors?.map((err) => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }
  };
};
