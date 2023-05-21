import { BadRequestException } from '@nestjs/common';
import * as Joi  from 'joi';
import { JoiValidationPipe } from './joi-validation.pipe';

describe('JoiValidationPipe', () => {
  let joiValidationPipe: JoiValidationPipe;

  it('should not throw exception when validation is successful', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    joiValidationPipe = new JoiValidationPipe(schema);

    expect(() => joiValidationPipe.transform({ name: 'test' }, { type: 'body' }))
      .not.toThrow();
  });

  it('should throw BadRequestException when validation fails', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    joiValidationPipe = new JoiValidationPipe(schema);

    expect(() => joiValidationPipe.transform({}, { type: 'body' }))
      .toThrow(BadRequestException);
  });
});
