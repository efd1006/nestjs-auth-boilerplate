import { UserGender, UserRole } from "../enums"
import { IsEnum, IsEmail } from "class-validator"
import { IsValidDate } from "src/shared/validation/isvaliddate.validation"
import { ApiProperty } from "@nestjs/swagger"

export class UserDTO {

  @ApiProperty()
  @IsEmail({}, {message: 'must be a valid email address.'})
  email: string

  @ApiProperty()
  fullname: string

  @ApiProperty()
  contact_number: string

  @ApiProperty({ type: 'string', format: 'date' })
  @IsValidDate({message: 'Date must be valid.'})
  date_of_birth: Date

  @ApiProperty({enum: UserGender})
  @IsEnum(UserGender)
  gender: UserGender

  @ApiProperty({enum: UserRole})
  @IsEnum(UserRole)
  role: UserRole
}