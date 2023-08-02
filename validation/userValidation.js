const joi = require("joi");

const user = joi.object({
  name: joi.string().min(3).max(15).required(),
  email: joi.string().required(),
  age : joi.number().max(120).required(),
  nationality : joi.string().required(),
  password: joi.string().min(8).max(16).required(),
  skills : joi.array().items(joi.object().keys({
    skill : joi.string().required(),
    certificates : joi.string().required(),
  })),
  hobby : joi.array().items(joi.string().required()).required()
});

module.exports = user;
