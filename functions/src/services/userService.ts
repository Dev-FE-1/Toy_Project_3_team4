import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { User } from '../models/models';

export class UserService {
  private userRepository: ReturnType<typeof getRepository<User>>;

  constructor() {
    getFirestore();
    this.userRepository = getRepository(User);
  }

  async createUser(userData: {
    displayName: string;
    email: string;
    profileImage?: string;
    bio?: string;
  }): Promise<User> {
    const existingUser = await this.userRepository.whereEqualTo('email', userData.email).findOne();
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = new User();
    newUser.displayName = userData.displayName;
    newUser.email = userData.email;
    newUser.profileImage = userData.profileImage || '';
    newUser.bio = userData.bio || '';

    return await this.userRepository.create(newUser);
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.userRepository.findById(userId);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, userData);

    return await this.userRepository.update(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async subscribeToUser(userId: string, targetUserId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const targetUser = await this.userRepository.findById(targetUserId);

    if (!user || !targetUser) {
      throw new Error('User not found');
    }

    if (!user.subscriptions) {
      user.subscriptions = [];
    }
    if (!targetUser.followers) {
      targetUser.followers = [];
    }

    user.subscriptions.push(targetUserId);
    targetUser.followers.push(userId);

    await this.userRepository.update(user);
    await this.userRepository.update(targetUser);
  }
}
