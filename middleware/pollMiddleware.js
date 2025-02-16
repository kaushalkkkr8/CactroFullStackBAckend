const joi = require("joi");
const { model } = require("mongoose");

const pollValidation = (req, res, next) => {
  const schema = joi.object({
    question: joi.string().required(),
    options: joi
      .array()
      .items(joi.object({ text: joi.string().required() }))
      .min(2),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = pollValidation;
