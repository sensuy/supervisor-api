import { CreatePermissionSchema } from "./create-permission.schema";


describe('create permission validation', () => {
  it('should be able to validate a correct permission', () => {
    const input = {
      permissionid: 'CREATE_FRANCHISE',
      label: 'Create franchise',
      type: 'FRANCHISE'
    };

    const result = CreatePermissionSchema.validate(input);

    expect(result.error).toBeUndefined();
  });

  describe('permissionid', () => {
    it('should not be able to validate an empty permissionid', () => {
      const input = {
        permissionid: '',
        label: 'Create franchise',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);

      expect(error.message).toEqual('permissionid cannot be an empty field');
    });

    it('should not be able to validate a missing permissionid', () => {
      const input = {
        label: 'Create franchise',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);
      expect(error.message).toEqual('permissionid is a required field');
    });

    it('should not be able to validate if permission its not a text', () => {
      const input = {
        permissionid: 123,
        label: 'Create franchise',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);

      expect(error.message).toEqual('permissionid should be a type of text');
    });

    it('should not be able to validate if permission has some lowercase letter', () => {
      const input = {
        permissionid: 'create_franchise',
        label: 'Create franchise',
        type: 'FRANCHISE'
      };

      const { error } = CreatePermissionSchema.validate(input);

      expect(error.message).toEqual('permissionid should only contain uppercase letters and underlines');
    });

    it('should not be able to validate if permission has some space', () => {
      const input = {
        permissionid: 'CREATE FRANCHISE',
        label: 'Create franchise',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);

      expect(error.message).toEqual('permissionid should only contain uppercase letters and underlines');
    });

    it('should not be able to validate a permissionid with less than 5 characters', () => {
      const input = {
        permissionid: 'AA',
        label: 'Create franchise',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);
      expect(error.message).toEqual('permissionid cannot be shorter than 5 characters');
    });

    it('should not be able to validate a permissionid with more than 100 characters', () => {
      const input = {
        permissionid: 'A'.repeat(101),
        label: 'Create franchise',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);
      expect(error.message).toEqual('permissionid cannot be longer than 100 characters');
    });
  });

  describe('label', () => {
    it('should not be able to validate an empty label', () => {
      const input = {
        permissionid: 'CREATE_FRANCHISE',
        label: '',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);

      expect(error.message).toEqual('label cannot be an empty field');
    });

    it('should not be able to validate a missing label', () => {
      const input = {
        permissionid: 'CREATE_FRANCHISE',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);
      expect(error.message).toEqual('label is a required field');
    });

    it('should not be able to validate if label its not a text', () => {
      const input = {
        permissionid: 'CREATE_FRANCHISE',
        label: 123,
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);

      expect(error.message).toEqual('label should be a type of text');
    });

    it('should not be able to validate a label with less than 5 characters', () => {
      const input = {
        permissionid: 'CREATE_FRANCHISE',
        label: 'AA',
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);
      expect(error.message).toEqual('label cannot be shorter than 5 characters');
    });

    it('should not be able to validate a label with more than 100 characters', () => {
      const input = {
        permissionid: 'CREATE_FRANCHISE',
        label: 'A'.repeat(101),
        type: 'FRANCHISE'
      };
      const { error } = CreatePermissionSchema.validate(input);
      expect(error.message).toEqual('label cannot be longer than 100 characters');
    });
  });

  describe('type', () => {
    it('should not be able to validate an empty type', () => {
      const input = {
        permissionid: 'CREATE_FRANCHISE',
        label: 'Create franchise',
        type: ''
      };
      const { error } = CreatePermissionSchema.validate(input);

      expect(error.message).toEqual('type should be one of the following values: [FRANCHISE, SCHOOL]');
    });

    it('should not be able to validate a missing type', () => {
      const input = {
        permissionid: 'CREATE_FRANCHISE',
        label: 'Create franchise',
      };
      const { error } = CreatePermissionSchema.validate(input);
      expect(error.message).toEqual('type is a required field');
    });

    it('should not be able to validate a type that is not a valid PermissionOriginEnum', () => {
      const input = {
        permissionid: 'CREATE_FRANCHISE',
        label: 'Create franchise',
        type: 'test-permission-type'
      };
      const { error } = CreatePermissionSchema.validate(input);

      expect(error.message).toEqual('type should be one of the following values: [FRANCHISE, SCHOOL]');
    });
  });
});