import * as Joi from "joi";
import { roleIdSchema } from "./roleid.schema";

describe('roleid validation', () => {
  it('should be able to validate a correct roleid', () => {
    const input = { roleIdSchema: 123 };
    const result = Joi.object({  roleIdSchema  }).validate(input);

    expect(result.error).toBeUndefined();
  });

  it('should be able to throw a error if roleid is not a number', () => {
    const input = { roleIdSchema: 'asdf' };
    const { error } = Joi.object({  roleIdSchema  }).validate(input);

    expect(error.message).toEqual('roleid should be a type of number');
  });
}) 