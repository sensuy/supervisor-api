import * as Joi from "joi";

export const idSchema = Joi
.string()
.uuid()
.messages({
  'string.base': `id must be a UUID`,
  'string.empty': `id cannot be an empty field`,
  'string.guid': `id must be a UUID`
})