
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import * as moment from 'moment'
import { Logger } from "@nestjs/common";

export function MinYear(minYear: any,validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "MinYear",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [minYear],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return !moment(value).isBefore(minYear, 'year')
        }
      }
    });
  };
}




