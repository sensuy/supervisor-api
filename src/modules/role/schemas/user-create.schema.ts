import * as Joi from "joi";
import { email } from "@shared/schemas/email.schema";
import { password } from "@shared/schemas/password.schema";
import { username } from "./username.schema";

export const userCreateSchema = Joi.object({
  username,
  email,
  password
});  
