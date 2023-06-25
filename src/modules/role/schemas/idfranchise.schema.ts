import * as Joi from "joi";

export const idfranchiseSchema = Joi
.string()
.uuid()
.messages({
  'string.base': `idfranchise should be a type of 'text'`,
  'string.empty': `idfranchise cannot be an empty field`,
  'string.guid': `idfranchise must be a UUID`,
  'any.required': `idfranchise is a required field`
})