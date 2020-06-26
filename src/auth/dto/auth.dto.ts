import { IsEmail, MinLength, IsNumber } from 'class-validator'
import { UserDTO } from 'src/user/dto/user.dto'

export class LoginDTO {
  
  @IsEmail({}, {message: 'must be a valid email address.'})
  email: string

  @MinLength(8, {message: "must be longer than or equal to 8 characters"})
  password: string
}

export class RegisterDTO extends UserDTO {

  @MinLength(8, {message: "must be longer than or equal to 8 characters"})
  password: string
}