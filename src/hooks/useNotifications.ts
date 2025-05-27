import {useState, useEffect, useCallback, useRef} from 'react';

import {notificationAPI, Notification} from '@/apis/notification';

interface UseNotificationsReturn {
    notifications: Notification[];
    loading: boolean;
    hasNext: boolean;
    error: string | null;
    loadMore: () => Promise<void>;
    markAsRead: (id: number) => Promise<void>;
    deleteAll: () => Promise<void>;
    refresh: () => Promise<void>;
}

export const useNotifications = (): UseNotificationsReturn => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sseRef = useRef<EventSource | null>(null);

    // 초기 로딩
    const loadInitialNotifications = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await notificationAPI.getNotifications(
                undefined
            );

            setNotifications(response.notifications);
            setHasNext(response.hasNext);
        } catch (err) {
            setError(err instanceof Error ? err.message : '알림 로딩 실패');
        } finally {
            setLoading(false);
        }
    }, []);

    // 무한스크롤
    const loadMore = useCallback(async () => {
        if (loading || !hasNext) return;

        try {
            setLoading(true);
            setError(null);

            const lastNotificationId = notifications[notifications.length - 1]?.id;

            const response = await notificationAPI.getNotifications(lastNotificationId);

            setNotifications(prev => {
                const newUniqueNotifications = response.notifications.filter(
                    n => !prev.some(existing => existing.id === n.id)
                );
                return [...prev, ...newUniqueNotifications];
            });

            setHasNext(response.hasNext);
        } catch (err) {
            setError(err instanceof Error ? err.message : '추가 로딩 실패');
        } finally {
            setLoading(false);
        }
    }, [notifications, loading, hasNext]);

    // 읽음 처리
    const markAsRead = useCallback(async (id: number) => {
        try {
            await notificationAPI.markAsRead(id);

            setNotifications(prev =>
                prev.map(n =>
                    n.id === id ? {...n, isRead: true} : n
                )
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : '읽음 처리 실패');
        }
    }, []);

    // 전체 삭제
    const deleteAll = useCallback(async () => {
        try {
            await notificationAPI.deleteAll();
            setNotifications([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : '전체 삭제 실패');
        }
    }, []);

    // 새로고침
    const refresh = useCallback(async () => {
        setNotifications([]);
        setHasNext(true);
        await loadInitialNotifications();
    }, [loadInitialNotifications]);

    // SSE 연결 및 실시간 알림 수신
    useEffect(() => {
        const connectSSE = () => {
            try {
                sseRef.current = notificationAPI.connectSSE((newNotification) => {
                    console.log('새 알림 수신:', newNotification);
                    setNotifications(prev => {
                        if (prev.some(n => n.id === newNotification.id)) {
                            console.log('중복 알림 발견, 추가 안 함:', newNotification.id);
                            return prev;
                        }
                        return [newNotification, ...prev];
                    });
                });

                sseRef.current.onerror = () => {
                    // 연결 끊기면 닫고 5초 뒤 재연결 시도
                    if (sseRef.current) {
                        sseRef.current.close();
                        sseRef.current = null;
                    }
                    setTimeout(() => {
                        connectSSE();
                    }, 5000);
                };
            } catch (err) {
                console.error('SSE 연결 실패:', err);
            }
        };

        connectSSE();

        return () => {
            if (sseRef.current) {
                sseRef.current.close();
                sseRef.current = null;
            }
        };
    }, []);

    // 초기 데이터 로딩
    useEffect(() => {
        loadInitialNotifications();
    }, [loadInitialNotifications]);

    return {
        notifications,
        loading,
        hasNext,
        error,
        loadMore,
        markAsRead,
        deleteAll,
        refresh,
    };
};