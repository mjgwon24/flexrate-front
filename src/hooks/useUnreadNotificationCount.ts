import {useState, useEffect, useCallback} from 'react';

import {notificationAPI} from '@/apis/notification';

interface UseUnreadNotificationCountReturn {
    unreadCount: number;
    loading: boolean;
    error: string | null;
    refreshCount: () => Promise<void>;
}

export const useUnreadNotificationCount = (): UseUnreadNotificationCountReturn => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUnreadCount = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await notificationAPI.getUnreadCount();
            setUnreadCount(response.unreadCount);
        } catch (err) {
            setError(err instanceof Error ? err.message : '안읽은 알림 개수 조회 실패');
            setUnreadCount(0);
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshCount = useCallback(async () => {
        await fetchUnreadCount();
    }, [fetchUnreadCount]);

    // 초기 로딩
    useEffect(() => {
        fetchUnreadCount();
    }, [fetchUnreadCount]);

    // 주기적으로 안읽은 알림 개수 갱신 (30초마다)
    useEffect(() => {
        const interval = setInterval(() => {
            fetchUnreadCount();
        }, 30000);

        return () => clearInterval(interval);
    }, [fetchUnreadCount]);

    return {
        unreadCount,
        loading,
        error,
        refreshCount,
    };
};