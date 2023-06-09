import * as Joi from "joi";
import {
  email,
  password,
  username
} from "./user.shcema";

export const userCreateSchema = Joi.object({
  username,
  email,
  password
});  
