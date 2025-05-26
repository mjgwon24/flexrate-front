'use client';

import {useEffect, useCallback, useRef} from 'react';

import {
    EmptyIcon,
    EmptyState,
    EmptyText,
    MainContainer,
    NotificationList,
    TopSection,
    Wrapper,
    LoadingSpinner,
    ErrorMessage
} from "@/app/notifications/page.style";
import Header from '@/components/Header/Header';
import NotificationItem from '@/components/NotificationItem/NotificationItem';
import {ChangeBtn} from '@/components/TextField/TextField.style';
import {useNotifications} from '@/hooks/useNotifications';
import {formatNotificationTime} from '@/utils/notificationDate';

const NotificationPage = () => {
    const {
        notifications,
        loading,
        hasNext,
        error,
        loadMore,
        markAsRead,
        deleteAll,
        refresh
    } = useNotifications();

    const observerRef = useRef<IntersectionObserver>();
    const lastNotificationRef = useRef<HTMLDivElement>(null);
    const user = true;

    // 무한스크롤 구현
    const lastNotificationElementRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNext) {
                loadMore();
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loading, hasNext, loadMore]);

    const handleDeleteAll = async () => {
        if (notifications.length === 0) return;

        if (confirm('모든 알림을 삭제하시겠습니까?')) {
            await deleteAll();
        }
    };

    const handleNotificationClick = async (id: number) => {
        await markAsRead(id);
    };

    // 에러 발생 시 새로고침 버튼
    const handleRetry = () => {
        refresh();
    };

    return (
        <Wrapper>
            <Header backIcon type="알림함" user={user}/>
            <TopSection>
                <ChangeBtn
                    style={{marginLeft: 'auto'}}
                    onClick={handleDeleteAll}
                    disabled={notifications.length === 0}
                >
                    전체 삭제
                </ChangeBtn>
            </TopSection>

            <MainContainer>
                {error && (
                    <ErrorMessage>
                        <p>{error}</p>
                        <button onClick={handleRetry}>다시 시도</button>
                    </ErrorMessage>
                )}

                <NotificationList>
                    {notifications.map((notification, index) => {
                        const isLast = index === notifications.length - 1;

                        return (
                            <div
                                key={notification.id}
                                ref={isLast ? lastNotificationElementRef : null}
                            >
                                <NotificationItem
                                    id={notification.id}
                                    message={notification.content}
                                    time={formatNotificationTime(notification.sentAt)}
                                    isRead={notification.isRead}
                                    onClick={handleNotificationClick}
                                    delay={index * 0.1}
                                />
                            </div>
                        );
                    })}
                </NotificationList>

                {/* 로딩 스피너 */}
                {loading && notifications.length > 0 && (
                    <LoadingSpinner>
                        <div className="spinner"/>
                    </LoadingSpinner>
                )}

                {/* 빈 상태 */}
                {notifications.length === 0 && !loading && !error && (
                    <EmptyState>
                        <EmptyIcon>
                            <img
                                src="/icons/alert_24.svg"
                                width={48}
                                height={48}
                                style={{opacity: 0.3}}
                            />
                        </EmptyIcon>
                        <EmptyText>알림이 없습니다</EmptyText>
                    </EmptyState>
                )}

                {/* 초기 로딩 */}
                {loading && notifications.length === 0 && (
                    <LoadingSpinner>
                        <div className="spinner"/>
                        <p>알림을 불러오는 중...</p>
                    </LoadingSpinner>
                )}
            </MainContainer>
        </Wrapper>
    );
};

export default NotificationPage;