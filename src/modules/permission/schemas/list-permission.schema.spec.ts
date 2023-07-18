import * as Joi from "joi";
import { listPermissionSchema } from "./list-permission.schema";

describe('create permission validation', () => {

  it('should be able to validate a valid permission type', () => {
    const input = {
      listPermissionSchema: 'FRANCHISE'
    };

    const result = Joi.object({ listPermissionSchema }).validate(input);
    
    expect(result.error).toBeUndefined();
  });

  it('should not be able to validate an empty type', () => {
    const input = {
      listPermissionSchema: ''
    };

    const { error } = Joi.object({ listPermissionSchema }).validate(input);

    expect(error.message).toEqual('type should be one of the following values: [FRANCHISE, SCHOOL]');
  });

  it('should not be able to validate a type that is not a valid PermissionOriginEnum', () => {
    const input = {
      listPermissionSchema: 'TEST_PERMISSION_TYPE'
    };

    const { error } = Joi.object({ listPermissionSchema }).validate(input);

    expect(error.message).toEqual('type should be one of the following values: [FRANCHISE, SCHOOL]');
  });
})