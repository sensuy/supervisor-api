import * as Joi from "joi";
import { PermissionOriginEnum } from "../enum/permission-type.enum";


export const listPermissionSchema = Joi.string()
  .valid(...Object.values(PermissionOriginEnum))
  .messages({
    'any.only': `type should be one of the following values: {#valids}`,
  })


