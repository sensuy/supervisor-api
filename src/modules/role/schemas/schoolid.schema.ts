import * as Joi from "joi";

export const schoolIdSchema = Joi
.string()
.uuid()
.messages({
  'string.base': `schoolid should be a type of text`,
  'string.empty': `schoolid cannot be an empty field`,
  'string.guid': `schoolid must be a UUID`
})