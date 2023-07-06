import { nameSchema } from "./name.schema";


describe('name', () => {
  it('should be able to validate a valid name', () => {
    const input = {
      name: 'admin'
    };
    const result = nameSchema.validate(input);

    expect(result.error).toBeUndefined();
  });

  it('should not be able to validate an empty name', () => {
    const input = {
      name: ''
    };
    const { error } = nameSchema.validate(input);

    expect(error.message).toEqual('name cannot be an empty field');
  });

  it('should not be able to validate a missing name', () => {
    const input = {};
    const { error } = nameSchema.validate(input);
    expect(error.message).toEqual('name is a required field');
  });

  it('should not be able to validate a null name', () => {
    const input = {
      name: null
    };
    const { error } = nameSchema.validate(input);
    expect(error.message).toEqual('name should be a type of text');
  });

  it('should not be able to validate a name with less than 3 characters', () => {
    const input = {
      name: 'ab'
    };
    const { error } = nameSchema.validate(input);
    expect(error.message).toEqual('name cannot be shorter than 3 characters');
  });

  it('should not be able to validate a name with more than 50 characters', () => {
    const input = {
      name: 'a'.repeat(51)
    };
    const { error } = nameSchema.validate(input);
    expect(error.message).toEqual('name cannot be longer than 50 characters');
  });
});