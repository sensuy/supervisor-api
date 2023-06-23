import * as Joi from "joi";

export const uuid = Joi
  .string()
  .allow(null)
  .uuid()