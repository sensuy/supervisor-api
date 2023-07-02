import * as Joi from "joi";

export const franchiseIdSchema = Joi
.string()
.uuid()
.messages({
  'string.base': `franchiseid should be a type of text`,
  'string.empty': `franchiseid cannot be an empty field`,
  'string.guid': `franchiseid must be a UUID`
})