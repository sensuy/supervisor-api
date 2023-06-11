import * as Joi from "joi";
import { password } from "./password.schema";

describe('password validation', () => {
  it('should be able to validate a correct password', () => {
    const input = { password: '1234@Abc' };
    const result = Joi.object({ password }).validate(input);

    expect(result.error).toBeUndefined();
  });

  it('should be able to throw a error if password is not a string', () => {
    const input = { password: 123 };
    const { error } = Joi.object({ password }).validate(input);
    expect(error.message).toEqual('password must be a string');
  });

  it('should be able to throw a error if password has empty value', () => {
    const input = { password: '' };
    const { error } = Joi.object({ password }).validate(input);
    expect(error.message).toEqual('password cannot be an empty field');
  });

  it('should be able to throw a error if password not contain at least a lowercase letter', () => {
    const input = { password: '1234@ABC' };
    const { error } = Joi.object({ password }).validate(input);
    expect(error.message).toEqual('password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
  });

  it('should be able to throw a error if password not contain at least a uppercase letter', () => {
    const input = { password: '1234@abc' };
    const { error } = Joi.object({ password }).validate(input);
    expect(error.message).toEqual('password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
  });

  it('should be able to throw a error if password not contain at least a digit', () => {
    const input = { password: 'abcd@ABC' };
    const { error } = Joi.object({ password }).validate(input);
    expect(error.message).toEqual('password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
  });
  
  it('should be able to throw a error if password not contain at least a special character', () => {
    const input = { password: '12345Abc' };
    const { error } = Joi.object({ password }).validate(input);
    expect(error.message).toEqual('password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
  });

  it('should be able to throw a error if password is not informed', () => {
    const input = { name: '' };
    const { error } = Joi.object({ password }).validate(input);
    expect(error.message).toEqual('password is a required field');
  });

  it('should be able to throw a error if password is less than 8 characters', () => {
    const input = { password: '1234@Ab' };
    const { error } = Joi.object({ password }).validate(input);
    expect(error.message).toEqual('password must be at least 8 characters');
  });

});