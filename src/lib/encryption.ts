var bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function validatePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}