import * as Joi from "joi";
import { name } from './name.schema';

export const roleCreateSchema = Joi.object({
  name,
  franchiseid: Joi
    .string()
    .uuid()
    .allow(null)
    .required()
    .messages({
      'string.empty': `{#key} cannot be an empty field, change to null`,
      'string.base': `{#key} must be of type string`,
      'string.guid': `{#key} must be a UUID`,
      'any.required': `{#key} is a required field`
    }),
  schoolid: Joi
    .string()
    .uuid()
    .allow(null)
    .required()
    .messages({
      'string.empty': `{#key} cannot be an empty field, change to null`,
      'string.base': `{#key} must be of type string`,
      'string.guid': `{#key} must be a UUID`,
      'any.required': `{#key} is a required field`
    }),
});