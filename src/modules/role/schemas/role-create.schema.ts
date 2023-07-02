import * as Joi from "joi";
import { name } from './name.schema';

export const roleCreateSchema = Joi.object({
  name,
  idfranchise: Joi
  .string()
  .uuid()
  .allow(null)
  .required()
  .messages({
    'string.empty': `idfranchise cannot be an empty field, change to null`,
    'string.guid': `idfranchise must be a UUID`,
    'any.required': `idfranchise is a required field`
  }),
  idschool: Joi
  .string()
  .uuid()
  .allow(null)
  .messages({
    'string.empty': `idschool cannot be an empty field, change to null`,
    'string.guid': `idschool must be a UUID`,
    'any.required': `idschool is a required field`
  }),
});