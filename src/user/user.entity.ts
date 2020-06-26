import { Entity, Column } from "typeorm";
import { UserRole, UserGender } from './enums'
import { BaseEntity } from "src/shared/entities";
import { Exclude, classToPlain } from 'class-transformer'

@Entity('user')
export class UserEntity extends BaseEntity {
  
  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  email: string
  
  @Exclude()
  @Column({
    type: 'varchar',
    length: 255
  })
  password: string

  @Column({
    type: 'varchar',
    length: 255
  })
  fullname: string

  @Column({
    type: 'varchar',
    length: 255
  })
  contact_number: string

  @Column({
    type: 'date',
    nullable: true
  })
  date_of_birth: Date

  @Column({
    type: 'enum',
    enum: UserGender
  })
  gender: UserGender
  
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PLATFORM_USER
  })
  role: UserRole


  toJSON() {
    return classToPlain(this)
  }
}
