// NotificationService
import { getRepository } from 'fireorm';

import { getFirestore } from '../firebase';
import { notifications } from '../models/models';

export class NotificationService {
  private notificationRepository: ReturnType<typeof getRepository<notifications>>;

  constructor() {
    getFirestore();
    this.notificationRepository = getRepository(notifications);
  }

  async createNotification(
    userId: string,
    type: string,
    relatedUserId: string,
  ): Promise<notifications> {
    const newNotification = new notifications();
    newNotification.userId = userId;
    newNotification.type = type;
    newNotification.relatedUserId = relatedUserId;
    newNotification.createdAt = new Date();
    newNotification.isRead = false;

    return await this.notificationRepository.create(newNotification);
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.isRead = true;
    await this.notificationRepository.update(notification);
  }
}
