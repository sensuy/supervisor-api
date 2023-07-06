import * as Joi from "joi";

export const roleIdSchema = Joi
.number()
.messages({
  'number.base': `roleid should be a type of number`
})