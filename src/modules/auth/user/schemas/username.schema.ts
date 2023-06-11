import * as Joi from 'joi';
import {
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
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


