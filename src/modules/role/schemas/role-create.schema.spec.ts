import { roleCreateSchema } from "./role-create.schema";

describe('create role validation', () => {
  it('should be able to validate a correct role', () => {
    const input = {
      name: 'admin',
      franchiseid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
      schoolid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
    };
    const result = roleCreateSchema.validate(input);

    expect(result.error).toBeUndefined();
  });

  describe('franchiseid', () => {

    it('should be able to validate a null franchiseid', () => {
      const input = {
        name: 'admin',
        franchiseid: null,
        schoolid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
      };
      const result = roleCreateSchema.validate(input);

      expect(result.error).toBeUndefined();
    });

    it('should not be able to validate an empty franchiseid', () => {
      const input = {
        name: 'admin',
        franchiseid: '',
        schoolid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
      };
      const { error } = roleCreateSchema.validate(input);

      expect(error.message).toEqual('franchiseid cannot be an empty field, change to null');
    });

    it('should not be able to validate an invalid franchiseid', () => {
      const input = {
        name: 'admin',
        franchiseid: 'invalid',
        schoolid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
      };
      const { error } = roleCreateSchema.validate(input);

      expect(error.message).toEqual('franchiseid must be a UUID');
    });

    it('should not be able to validate a missing franchiseid', () => {
      const input = {
        name: 'admin',
        schoolid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
      };
      const { error } = roleCreateSchema.validate(input);
      expect(error.message).toEqual('franchiseid is a required field');
    });
  });

  describe('schoolid', () => {
      
      it('should be able to validate a null schoolid', () => {
        const input = {
          name: 'admin',
          franchiseid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
          schoolid: null
        };
        const result = roleCreateSchema.validate(input);
  
        expect(result.error).toBeUndefined();
      });
  
      it('should not be able to validate an empty schoolid', () => {
        const input = {
          name: 'admin',
          franchiseid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
          schoolid: ''
        };
        const { error } = roleCreateSchema.validate(input);
  
        expect(error.message).toEqual('schoolid cannot be an empty field, change to null');
      });
  
      it('should not be able to validate an invalid schoolid', () => {
        const input = {
          name: 'admin',
          franchiseid: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001',
          schoolid: 'invalid'
        };
        const { error } = roleCreateSchema.validate(input);
        
        expect(error.message).toEqual('schoolid must be a UUID');
      });
    });
});