import { UserData } from '@/types/profile';

export interface UserModel extends UserData {
  userId: string;
  displayName: string;
  email: string;
  photoURL: string;
}
