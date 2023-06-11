import * as Joi from "joi";

export const email = Joi.string()
  .email()
  .required()
  .messages({
    'string.base': 'email must be a string',
    'string.empty': 'email cannot be an empty field',
    'string.email': 'email must be a valid email address',
    'any.required': 'email is a required field'
  });