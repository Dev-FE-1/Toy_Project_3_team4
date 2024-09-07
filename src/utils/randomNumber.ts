import { v4 as uuidv4 } from 'uuid';

export const generateRandomNumber = () => {
  const uuid = uuidv4();
  const numericValue = parseInt(uuid.replace(/-/g, ''), 16);
  return numericValue % 1000000; // 0부터 999999 사이의 숫자 반환
};
