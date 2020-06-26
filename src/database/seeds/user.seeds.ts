import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import * as bcrypt from 'bcryptjs';
import { UserGender, UserRole } from '../../user/enums';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('user')
      .values([
        {
          email: 'user@mail.com',
          password: await bcrypt.hash('8layer***', 10),
          fullname: 'Juan Dela Cruz',
          contact_number: '09092122222',
          date_of_birth: '1950-10-10',
          gender: UserGender.MALE,
          role: UserRole.PLATFORM_USER
        },
      ])
      .execute()
  }
}