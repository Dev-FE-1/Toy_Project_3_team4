import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { users } from '../models/models';

export class UserService {
  private userRepository: ReturnType<typeof getRepository<users>>;

  constructor() {
    getFirestore();
    this.userRepository = getRepository(users);
  }

  async createUser(userData: {
    userId?: string;
    displayName: string;
    email: string;
    photoURL?: string;
    bio?: string;
  }): Promise<users> {
    const existingUser = await this.userRepository.whereEqualTo('email', userData.email).findOne();
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = new users();

    if (userData.userId) {
      newUser.id = userData.userId;
    }
    newUser.displayName = userData.displayName;
    newUser.email = userData.email;
    newUser.photoURL = userData.photoURL || '';
    newUser.bio = userData.bio || '';

    return await this.userRepository.create(newUser);
  }

  async getUserById(userId: string): Promise<users | null> {
    return await this.userRepository.findById(userId);
  }

  async updateUser(userId: string, userData: Partial<users>): Promise<users> {
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

  private async checkFollowIntegrity(
    userId: string,
    targetUserId: string,
  ): Promise<[users, users]> {
    if (userId === targetUserId) {
      throw new Error('Users cannot follow/unfollow themselves');
    }

    const user = await this.userRepository.findById(userId);
    const targetUser = await this.userRepository.findById(targetUserId);

    if (!user || !targetUser) {
      throw new Error('User not found');
    }

    if (!user.following) user.following = [];
    if (!targetUser.followers) targetUser.followers = [];

    return [user, targetUser];
  }

  async followToUser(userId: string, targetUserId: string): Promise<void> {
    const [user, targetUser] = await this.checkFollowIntegrity(userId, targetUserId);

    if (user.following?.includes(targetUserId)) {
      throw new Error('User is already following the target user');
    }

    if (targetUser.followers?.includes(userId)) {
      throw new Error('Target user is already followed by the user');
    }

    user.following?.push(targetUserId);
    targetUser.followers?.push(userId);

    await this.userRepository.update(user);
    await this.userRepository.update(targetUser);
  }

  async unfollowUser(userId: string, targetUserId: string): Promise<void> {
    const [user, targetUser] = await this.checkFollowIntegrity(userId, targetUserId);

    if (!user.following?.includes(targetUserId)) {
      throw new Error('User is not following the target user');
    }

    if (!targetUser.followers?.includes(userId)) {
      throw new Error('Target user is not followed by the user');
    }

    user.following = user.following.filter((id) => id !== targetUserId);
    targetUser.followers = targetUser.followers.filter((id) => id !== userId);

    await this.userRepository.update(user);
    await this.userRepository.update(targetUser);
  }
}
