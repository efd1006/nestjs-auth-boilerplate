
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import * as moment from 'moment'
import { Logger } from "@nestjs/common";

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsValidDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return moment(value, 'YYYY-MM-DD',true).isValid()
        }
      }
    });
  };
}
