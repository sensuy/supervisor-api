import * as Joi from "joi";
import { franchiseIdSchema } from "./franchiseid.schema";

describe('FranchiseIdSchema', () => {
  it('should be able to validate a valid franchiseId', () => {
    const input = {
      franchiseIdSchema: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001'
    };

    const result = Joi.object({ franchiseIdSchema }).validate(input);    

    expect(result.error).toBeUndefined();
  });

  it('should not be able to validate an empty franchiseId', () => {
    const input = {
      franchiseIdSchema: ''
    };
    const { error } = Joi.object({ franchiseIdSchema }).validate(input);

    expect(error.message).toEqual('franchiseid cannot be an empty field');
  });

  it('should be able to throw a error if franchiseid is not a UUID', () => {
    const input = {
      franchiseIdSchema: '123'
    };
    const { error } = Joi.object({ franchiseIdSchema }).validate(input);

    expect(error.message).toEqual('franchiseid must be a UUID');
  });

  it('should not be able to validate a null franchiseid', () => {
    const input = {
      franchiseId: null
    };
    const { error } = franchiseIdSchema.validate(input);
    expect(error.message).toEqual('franchiseid should be a type of text');
  });
});