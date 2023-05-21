import * as Joi from 'joi';
import {
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MIN_LENGTH
} from '../constants/user.constants';


export const username = Joi
  .string()
  .min(USER_NAME_MIN_LENGTH)
  .max(USER_NAME_MAX_LENGTH)
  .required()
  .messages({
    'string.base': 'username must be a string',
    'string.empty': 'username cannot be an empty field',
    'string.max': `username cannot be more than ${USER_NAME_MAX_LENGTH} characters`,
    'string.min': `username cannot be less than ${USER_NAME_MIN_LENGTH} characters`,
    'any.required': 'username is a required field'
  });

export const email = Joi.string()
  .email()
  .required()
  .messages({
    'string.base': 'email must be a string',
    'string.empty': 'email cannot be an empty field',
    'string.email': 'email must be a valid email address',
    'any.required': 'email is a required field'
  });


export const password = Joi.string().min(USER_PASSWORD_MIN_LENGTH)
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
  .required()
  .messages({
    'string.base': 'password must be a string',
    'string.empty': 'password cannot be an empty field',
    'string.pattern.base': 'password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
    'any.required': 'password is a required field',
    'string.min': `password must be at least ${USER_PASSWORD_MIN_LENGTH} characters`,
  });