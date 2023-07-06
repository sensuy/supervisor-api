import * as Joi from "joi";
import { PASSWORD_MIN_LENGTH } from "@shared/constants";


export const password = Joi.string().min(PASSWORD_MIN_LENGTH)
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
  .required()
  .messages({
    'string.base': 'password must be a string',
    'string.empty': 'password cannot be an empty field',
    'string.pattern.base': 'password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
    'any.required': 'password is a required field',
    'string.min': `password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  });