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
        let reconnectAttempts = 0;
        const maxReconnectAttempts = 5;

        const connectSSE = () => {
            try {
                // 기존 연결이 있으면 정리
                if (sseRef.current) {
                    sseRef.current.close();
                    sseRef.current = null;
                }

                console.log('SSE 연결 시도 중...');
                sseRef.current = notificationAPI.connectSSE((newNotification) => {
                    console.log('새 알림 수신:', newNotification);
                    // 연결 성공 시 재연결 시도 횟수 리셋
                    reconnectAttempts = 0;

                    setNotifications(prev => {
                        if (prev.some(n => n.id === newNotification.id)) {
                            console.log('중복 알림 발견, 추가 안 함:', newNotification.id);
                            return prev;
                        }
                        return [newNotification, ...prev];
                    });
                });

                // 연결 성공 이벤트 핸들러
                sseRef.current.onopen = () => {
                    console.log('SSE 연결 성공');
                    reconnectAttempts = 0;
                };

                // 메시지 수신 핸들러 (heartbeat 포함)
                sseRef.current.onmessage = (event) => {
                    // connect 이벤트나 heartbeat 같은 일반 메시지 처리
                    if (event.type === 'message') {
                        console.log('SSE 메시지 수신:', event.data);
                    }
                };

                // 에러 핸들러 개선
                sseRef.current.onerror = (error) => {
                    console.error('SSE 에러 발생:', error);

                    // 연결 상태 확인
                    if (sseRef.current?.readyState === EventSource.CLOSED) {
                        console.log('SSE 연결이 서버에서 닫힘');

                        // 최대 재연결 시도 횟수 체크
                        if (reconnectAttempts < maxReconnectAttempts) {
                            reconnectAttempts++;
                            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 30000); // 지수 백오프
                            console.log(`${delay}ms 후 재연결 시도 (${reconnectAttempts}/${maxReconnectAttempts})`);

                            setTimeout(() => {
                                connectSSE();
                            }, delay);
                        } else {
                            console.error('최대 재연결 시도 횟수 초과');
                        }
                    } else if (sseRef.current?.readyState === EventSource.CONNECTING) {
                        console.log('SSE 연결 중...');
                        // 연결 중인 경우는 기다림
                    } else {
                        console.log('SSE 일시적 에러, 연결 유지');
                        // 일시적 에러의 경우 연결을 유지하고 재연결하지 않음
                    }
                };

            } catch (err) {
                console.error('SSE 연결 실패:', err);

                // 연결 실패 시에도 재시도
                if (reconnectAttempts < maxReconnectAttempts) {
                    reconnectAttempts++;
                    setTimeout(() => {
                        connectSSE();
                    }, 5000);
                }
            }
        };

        connectSSE();

        return () => {
            console.log('SSE 연결 정리');
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