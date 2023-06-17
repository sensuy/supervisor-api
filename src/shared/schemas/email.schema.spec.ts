import * as Joi from "joi";
import { email } from "./email.schema";

describe('email validation', () => {
  it('should be able to validate a correct email', () => {
    const input = { email: 'jhondoe@email.com' };
    const result = Joi.object({ email }).validate(input);

    expect(result.error).toBeUndefined();
  });

  it('should be able to throw a error if email is not a string', () => {
    const input = { email: 123 };
    const { error } = Joi.object({ email }).validate(input);
    expect(error.message).toEqual('email must be a string');
  });

  it('should be able to throw a error if email has empty value', () => {
    const input = { email: '' };
    const { error } = Joi.object({ email }).validate(input);
    expect(error.message).toEqual('email cannot be an empty field');
  });

  it('should be able to throw a error if email is not a valid email address', () => {
    const input = { email: 'jhondoe' };
    const { error } = Joi.object({ email }).validate(input);
    expect(error.message).toEqual('email must be a valid email address');
  });

  it('should be able to throw a error if email is not informed', () => {
    const input = { name: '' };
    const { error } = Joi.object({ email }).validate(input);
    expect(error.message).toEqual('email is a required field');
  });
});