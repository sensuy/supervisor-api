import * as Joi from 'joi';
import { USER_EMAIL_MAX_LENGTH, USER_EMAIL_MIN_LENGTH, USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from '../constants/user.constants';


const userName = Joi
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

  const email = Joi.string()
  .email()
  .required()
  .min(USER_EMAIL_MIN_LENGTH)
  .max(USER_EMAIL_MAX_LENGTH)
  .messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be an empty field',
    'string.email': 'Email must be a valid email address',

    'any.required': 'Email is a required field'
  });
