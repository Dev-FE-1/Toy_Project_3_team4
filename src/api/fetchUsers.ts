import { axiosApi } from '@/api/apiConfig';

interface User {
  userId: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
}

export const fetchCreateUser = async (data: {
  userId: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
}): Promise<User> => {
  try {
    const response = await axiosApi.post('/users', data);
    return response.data;
  } catch (error) {
    console.error('유저 생성 실패:', error);
    throw error;
  }
};
