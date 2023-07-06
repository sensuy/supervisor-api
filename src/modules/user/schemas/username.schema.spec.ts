import * as Joi from "joi";
import { username } from "./username.schema";


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