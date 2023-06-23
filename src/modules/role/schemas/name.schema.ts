import * as Joi from 'joi';
import { ROLE_NAME_MAX_LENGTH, ROLE_NAME_MIN_LENGTH } from '../constants/role.constants';


export const name = Joi
  .string()
  .min(ROLE_NAME_MIN_LENGTH)
  .max(ROLE_NAME_MAX_LENGTH)
  .required()


