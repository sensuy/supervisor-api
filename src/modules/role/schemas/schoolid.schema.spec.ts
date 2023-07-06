import * as Joi from "joi";
import { schoolIdSchema } from "./schoolid.schema";

  describe('schoolid validation', () => {
    it('should be able to validate a correct schoolid', () => {
      const input = { schoolIdSchema: '31fe7e4b-95a1-408f-a35f-d8b2b06217a9' };
      const result = Joi.object({  schoolIdSchema  }).validate(input);

      expect(result.error).toBeUndefined();
    });

    it('should be able to throw a error if schoolid is not a string', () => {
      const input = { schoolIdSchema: 123 };
      const { error } = Joi.object({  schoolIdSchema  }).validate(input);

      expect(error.message).toEqual('schoolid should be a type of text');
    });

    it('should be able to throw a error if schoolid has empty value', () => {
      const input = { schoolIdSchema: '' };
      const { error } = Joi.object({  schoolIdSchema  }).validate(input);

      expect(error.message).toEqual('schoolid cannot be an empty field');
    });

    it('should be able to throw a error if schoolid is not a UUID', () => {
      const input = { schoolIdSchema: '123' };
      const { error } = Joi.object({  schoolIdSchema  }).validate(input);

      expect(error.message).toEqual('schoolid must be a UUID');
    });
  })