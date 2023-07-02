import { roleCreateSchema } from "./role-create.schema";

describe('create role validation', () => {
  it('should be able to validate a correct role', () => {
    const input = {
      name: 'admin',
      idfranchise: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
      idschool: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
    };
    const result = roleCreateSchema.validate(input);

    expect(result.error).toBeUndefined();
  });

  describe('idfranchise', () => {

    it('should be able to validate a null idfranchise', () => {
      const input = {
        name: 'admin',
        idfranchise: null,
        idschool: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
      };
      const result = roleCreateSchema.validate(input);

      expect(result.error).toBeUndefined();
    });

    it('should not be able to validate an empty idfranchise', () => {
      const input = {
        name: 'admin',
        idfranchise: '',
        idschool: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
      };
      const { error } = roleCreateSchema.validate(input);

      expect(error.message).toEqual('idfranchise cannot be an empty field, change to null');
    });

    it('should not be able to validate an invalid idfranchise', () => {
      const input = {
        name: 'admin',
        idfranchise: 'invalid',
        idschool: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
      };
      const { error } = roleCreateSchema.validate(input);

      expect(error.message).toEqual('idfranchise must be a UUID');
    });

    it('should not be able to validate a missing idfranchise', () => {
      const input = {
        name: 'admin',
        idschool: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
      };
      const { error } = roleCreateSchema.validate(input);
      expect(error.message).toEqual('idfranchise is a required field');
    });
  });

  describe('idschool', () => {
      
      it('should be able to validate a null idschool', () => {
        const input = {
          name: 'admin',
          idfranchise: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
          idschool: null
        };
        const result = roleCreateSchema.validate(input);
  
        expect(result.error).toBeUndefined();
      });
  
      it('should not be able to validate an empty idschool', () => {
        const input = {
          name: 'admin',
          idfranchise: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
          idschool: ''
        };
        const { error } = roleCreateSchema.validate(input);
  
        expect(error.message).toEqual('idschool cannot be an empty field, change to null');
      });
  
      it('should not be able to validate an invalid idschool', () => {
        const input = {
          name: 'admin',
          idfranchise: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
          idschool: 'invalid'
        };
        const { error } = roleCreateSchema.validate(input);
        
        expect(error.message).toEqual('idschool must be a UUID');
      });
    });
});