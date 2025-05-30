import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

export enum NotificationType {
  INTEREST_RATE_CHANGE = 'INTEREST_RATE_CHANGE',
  LOAN_APPROVAL = 'LOAN_APPROVAL',
  LOAN_REJECTED = 'LOAN_REJECTED',
  MATURITY_NOTICE = 'MATURITY_NOTICE',
}

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

class NotificationAPI {
  private baseURL = 'http://localhost:8080/api/notification';

  private getAuthHeaders() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token이 없습니다.');
    }
    return { Authorization: `Bearer ${accessToken}` };
  }

  // SSE 연결 설정 (쿼리 파라미터로만 인증)
  connectSSE(onNotification: (notification: Notification) => void): EventSource {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token이 없습니다. SSE 연결 불가');
    }

    const eventSource = new EventSourcePolyfill(`${this.baseURL}/subscribe?token=${accessToken}`, {
      withCredentials: true,
    });

    eventSource.addEventListener('notification', (event) => {
      const messageEvent = event as MessageEvent; // 타입 단언
      const notification: Notification = JSON.parse(messageEvent.data);
      onNotification(notification);
    });

    eventSource.addEventListener('connect', (event) => {
      console.log('SSE 연결 성공:', event);
    });

    eventSource.addEventListener('error', (event) => {
      console.error('SSE 에러 발생:', event);
    });

    return eventSource;
  }

  // 알림 목록 조회 (무한스크롤)
  async getNotifications(lastNotificationId?: number): Promise<NotificationResponse> {
    const params = lastNotificationId ? { lastNotificationId } : {};

    try {
      const { data } = await axios.get<NotificationResponse>(this.baseURL, {
        headers: this.getAuthHeaders(),
        params,
      });
      return data;
    } catch (error) {
      throw new Error('알림 조회 실패');
    }
  }

  // 읽음 처리
  async markAsRead(notificationId: number): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/read/${notificationId}`, null, {
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      throw new Error('읽음 처리 실패');
    }
  }

  // 전체 삭제
  async deleteAll(): Promise<void> {
    try {
      await axios.delete(this.baseURL, {
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      throw new Error('전체 삭제 실패');
    }
  }

  // 읽지 않은 알림 개수
  async getUnreadCount(): Promise<NotificationCountResponse> {
    try {
      const { data } = await axios.get<NotificationCountResponse>(`${this.baseURL}/unread-count`, {
        headers: this.getAuthHeaders(),
      });
      return data;
    } catch (error) {
      throw new Error('읽지 않은 알림 개수 조회 실패');
    }
  }
}

export const notificationAPI = new NotificationAPI();
