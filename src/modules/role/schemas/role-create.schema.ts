import * as Joi from "joi";
import { name } from './name.schema';
import { idfranchiseSchema } from "./idfranchise.schema";
import { idschoolSchema } from "./idschool.schema";


export const roleCreateSchema = Joi.object({
  name,
  idfranchise: idfranchiseSchema ,
  idschool: idschoolSchema
});

