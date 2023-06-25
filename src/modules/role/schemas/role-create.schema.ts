import * as Joi from "joi";
import { name } from './name.schema';
import { idfranchiseSchema } from "./idfranchise.schema";
import { idschoolSchema } from "./idschool.schema";


export const roleCreateSchema = Joi.object({
  name,
  idfranchise: Joi
  .string()
  .uuid()
  .allow(null)
  .messages({
    'string.empty': `idfranchise cannot be an empty field`,
    'string.guid': `idfranchise must be a UUID`,
    'any.required': `idfranchise is a required field`
  }),
  idschool: Joi
  .string()
  .uuid()
  .allow(null)
  .messages({
    'string.empty': `idfranchise cannot be an empty field`,
    'string.guid': `idfranchise must be a UUID`,
    'any.required': `idfranchise is a required field`
  }),
});

