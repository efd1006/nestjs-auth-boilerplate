import { ExceptionFilter, ArgumentsHost, Catch } from "@nestjs/common";
import { ValidationException } from "../exceptions/validation.exception";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    return response.status(400).json({
      statusCode: 400,
      // type: 'ValidationException',
      message: exception.validationErrors
    })
  }
}