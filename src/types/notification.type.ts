import { NotificationType } from '@/constants/notification.constant';

export interface Notification {
  id: number;
  content: string;
  sentAt: string;
  isRead: boolean;
  type: NotificationType;
}

export interface NotificationResponse {
  notifications: Notification[];
  hasNext: boolean;
}

export interface NotificationCountResponse {
  unreadCount: number;
}

export interface NotificationBadgeProps {
  unreadCount: number;
  onClick: () => void;
  showCount?: boolean;
}

export interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  hasNext: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  deleteAll: () => Promise<void>;
  refresh: () => Promise<void>;
}
