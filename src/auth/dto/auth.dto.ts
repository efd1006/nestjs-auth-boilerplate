import { IsEmail, MinLength, IsNumber } from 'class-validator'
import { UserDTO } from 'src/user/dto/user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDTO {
  
  @ApiProperty()
  @IsEmail({}, {message: 'must be a valid email address.'})
  email: string

  @ApiProperty()
  @MinLength(8, {message: "must be longer than or equal to 8 characters"})
  password: string
}

export class RegisterDTO extends UserDTO {
  @ApiProperty()
  @MinLength(8, {message: "must be longer than or equal to 8 characters"})
  password: string
}