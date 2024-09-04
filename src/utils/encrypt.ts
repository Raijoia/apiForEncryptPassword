import { User } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export function encryptPassword(password: string): Promise<string> {
  const saltRounds = process.env.SALT_ROUNDS;

  return bcrypt.hash(password, parseInt(saltRounds));
}

export async function comparetor(
  password: string,
  hash: string,
): Promise<User | boolean> {
  if (await bcrypt.compare(password, hash)) {
    return true;
  } else {
    return false;
  }
}