import * as Joi from 'joi';
import { ROLE_NAME_MAX_LENGTH, ROLE_NAME_MIN_LENGTH } from '../constants/role.constants';


export const name = Joi
  .string()
  .min(ROLE_NAME_MIN_LENGTH)
  .max(ROLE_NAME_MAX_LENGTH)
  .required()
  .messages({
    'string.base': `{#key} should be a type of text`,
    'string.empty': `{#key} cannot be an empty field`,
    'string.min': `{#key} should have a minimum length of {#limit}`,
    'string.max': `{#key} should have a maximum length of {#limit}`,
    'any.required': `{#key} is a required field`
  });


  export const nameSchema = Joi.object({
    name
  });


