import * as Joi from "joi";
import { uuid } from "@shared/schemas/uuid.schema";
import { name } from './name.schema';

export const idfranchise = uuid;
const idschool = uuid;

export const roleCreateSchema = Joi.object({
  name,
  idfranchise,
  idschool
});

