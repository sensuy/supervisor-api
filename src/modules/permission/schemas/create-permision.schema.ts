import * as Joi from "joi";
import { PERMISSION_ID_MAX_LENGTH, PERMISSION_ID_MIN_LENGTH, PERMISSION_LABEL_MAX_LENGTH, PERMISSION_LABEL_MIN_LENGTH } from "../constants/permission.constants";
import { PermissionOriginEnum } from "../enum/permission-type.enum";

export const MessagesSchema = Joi.object().messages({
  'string.base': `{#key} should be a type of text`,
  'string.empty': `{#key} cannot be an empty field`,
  'any.only': `{#key} should be one of the following values: {#valids}`,
  'any.required': `{#key} is a required field`,
  'string.min': `{#key} cannot be shorter than {#limit} characters`,
  'string.max': `{#key} cannot be longer than {#limit} characters`,
  'string.pattern.base': `{#key} should only contain uppercase letters and underlines`,
})

export const PermissionCreateSchema = Joi.object({
  permissionid: Joi
    .string()
    .regex(/^[A-Z_]*$/)
    .min(PERMISSION_ID_MIN_LENGTH)
    .max(PERMISSION_ID_MAX_LENGTH)
    .required(),
  label: Joi.string()
    .min(PERMISSION_LABEL_MIN_LENGTH)
    .max(PERMISSION_LABEL_MAX_LENGTH)
    .required(),
  type: Joi.string()
    .valid(...Object.values(PermissionOriginEnum))
    .required(),
}).concat(MessagesSchema)

