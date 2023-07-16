import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { AnySchema } from 'joi';


@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: AnySchema) { }
  transform(value: any, metadata: ArgumentMetadata) {

    const { error } = this.schema.validate(value);
    if (error) {
      console.log(error.details);
      
      throw new BadRequestException(error.message);
    }
    return value;
  }
}