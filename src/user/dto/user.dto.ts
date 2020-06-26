import { UserGender, UserRole } from "../enums"
import { IsEnum, IsEmail } from "class-validator"
import { IsValidDate } from "src/shared/validation/isvaliddate.validation"

export class UserDTO {

  @IsEmail({}, {message: 'must be a valid email address.'})
  email: string

  fullname: string

  contact_number: string

  @IsValidDate({message: 'Date must be valid.'})
  date_of_birth: Date

  @IsEnum(UserGender)
  gender: UserGender

  @IsEnum(UserRole)
  role: UserRole
}