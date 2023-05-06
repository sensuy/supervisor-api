import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { AnySchema } from 'joi';


@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: AnySchema) { }
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      const message = error.details.map(({ message }) => message);
      throw new BadRequestException(message[0]);
    }
    return value;
  }
}