import { IsEmail, MinLength, IsNumber } from 'class-validator'

export class LoginDTO {
  
  @IsEmail({}, {message: 'must be a valid email address.'})
  email: string

  @MinLength(8, {message: "must be longer than or equal to 8 characters"})
  password: string
}