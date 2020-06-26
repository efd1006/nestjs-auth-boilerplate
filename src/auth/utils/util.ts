import * as bcrypt from 'bcryptjs'

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10)
}