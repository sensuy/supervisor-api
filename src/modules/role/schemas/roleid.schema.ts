import * as Joi from "joi";

export const roleIdSchema = Joi
.number()
.required()
.messages({
  'number.base': `roleid should be a type of number`,
  'number.empty': `roleid cannot be an empty param`,
  'any.required': `roleid is a required field`
})