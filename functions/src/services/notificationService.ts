import { getRepository } from 'fireorm';

import { Notification } from '../models/models';
export class NotificationService {
  private notificationRepository = getRepository(Notification);

  async createNotification(
    userId: string,
    type: string,
    relatedUserId: string,
  ): Promise<Notification> {
    const newNotification = new Notification();
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
