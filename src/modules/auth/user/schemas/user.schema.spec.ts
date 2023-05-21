import * as Joi from "joi";
import {
  email,
  password,
  username
} from "./user.shcema";

describe('User Validation Schema', () => {

  describe('username validation', () => {
    it('should be able to validate a correct username', () => {
      const input = { username: 'John Doe' };
      const result = Joi.object({ username }).validate(input);
      
      expect(result.error).toBeUndefined();
    });

    it('should be able to throw a error if username is not a string', () => {
      const input = { username: 123 };
      const { error } = Joi.object({ username }).validate(input);
      expect(error.message).toEqual('username must be a string');
    });

    it('should be able to throw a error if username has empty value', () => {
      const input = { username: '' };
      const { error } = Joi.object({ username }).validate(input);
      expect(error.message).toEqual('username cannot be an empty field');
    });

    it('should be able to throw a error if username is more than 50 characters', () => {
      const input = { username: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl sit amet aliquet ultricies, nisl nisl ultricies nisl, ne' };
      const { error } = Joi.object({ username }).validate(input);
      expect(error.message).toEqual(`username cannot be more than 50 characters`);
    });

    it('should be able to throw a error if username is less than 3 characters', () => {
      const input = { username: 'Jo' };
      const { error } = Joi.object({ username }).validate(input);
      expect(error.message).toEqual(`username cannot be less than 3 characters`);
    });

    it('should be able to throw a error if username is not informed', () => {
      const input = { name: '' };
      const { error } = Joi.object({ username }).validate(input);
      expect(error.message).toEqual('username is a required field');
    });

    
  })

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

})