import { Timestamp } from 'firebase/firestore';

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = Timestamp.now().toDate();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays === 1) return '하루 전';
  if (diffDays <= 7) return `${diffDays}일 전`;
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays <= 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
};

export const timestampToString = (timestamp: Timestamp): string => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  return date.toLocaleString();
};

export const stringToTimestamp = (dateString: string): Timestamp => {
  const date = new Date(dateString);
  return Timestamp.fromDate(date);
};

export const formatCreatedAt = (createdAt: Timestamp | string | number): string => {
  if (createdAt instanceof Timestamp) {
    return formatRelativeDate(createdAt.toDate().toISOString());
  } else if (typeof createdAt === 'string') {
    return formatRelativeDate(createdAt);
  } else if (typeof createdAt === 'number') {
    return formatRelativeDate(new Date(createdAt).toISOString());
  } else {
    throw new Error('Invalid date format');
  }
};
