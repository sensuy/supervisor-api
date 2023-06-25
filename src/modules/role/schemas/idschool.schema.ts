import * as Joi from "joi";

export const idschoolSchema = Joi
.string()
.uuid()
.messages({
  'string.base': `idschool should be a type of 'text'`,
  'string.empty': `idschool cannot be an empty field`,
  'string.guid': `idschool must be a UUID`
})