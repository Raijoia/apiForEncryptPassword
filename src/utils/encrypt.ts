import { User } from '@prisma/client';
import { ErrorResponse } from 'src/interface/errorResponse';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export function encryptPassword(password: string): Promise<string> {
  const saltRounds = process.env.SALT_ROUNDS;

  return bcrypt.hash(password, parseInt(saltRounds));
}

export async function comparetor(
  password: string,
  hash: string,
  userLogin: User,
): Promise<User | ErrorResponse> {
  if (await bcrypt.compare(password, hash)) {
    return Promise.resolve(userLogin);
  } else {
    return Promise.resolve({ message: 'Password is incorrect' });
  }
}