import type { User } from '@prisma/client';

export function encryptPassword(password: string): Promise<string> {
  const passwordString = password.toString();

  const cleanText = passwordString.replace(
    // eslint-disable-next-line no-useless-escape
    /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/g,
    '',
  );

  const transformedText = Array.from(cleanText)
    .map((char) => String.fromCharCode(char.charCodeAt(0) + 4))
    .join('');

  const rows = Math.ceil(transformedText.length / 4);

  const matrix: string[][] = [];

  let currentIndex = 0;
  for (let r = 0; r < rows; r++) {
    matrix[r] = [];
    for (let c = 0; c < 4; c++) {
      matrix[r][c] = transformedText[currentIndex] || ' ';
      currentIndex++;
    }
  }

  let encryptedText = '';
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < rows; r++) {
      encryptedText += matrix[r][c];
    }
  }

  // biome-ignore lint/style/useTemplate: <explanation>
  console.log('senha ' + encryptedText);

  return Promise.resolve(encryptedText);
}

export async function comparetor(
  password: string,
  hash: string,
): Promise<User | boolean> {
  const passwordEncrypted = await encryptPassword(password);

  if (passwordEncrypted !== hash) {
    return false;
  }

  return true;
}
