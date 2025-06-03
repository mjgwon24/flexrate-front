export const formatNotificationTime = (sentAt: string): string => {
    const now = new Date();
    const sentDate = new Date(sentAt);
    const diffInSeconds = Math.floor((now.getTime() - sentDate.getTime()) / 1000);

    // 1분 미만
    if (diffInSeconds < 60) {
        return '방금 전';
    }

    // 1시간 미만
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}분 전`;
    }

    // 24시간 미만
    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}시간 전`;
    }

    // 오늘인지 확인
    const today = new Date();
    const isToday = sentDate.toDateString() === today.toDateString();

    if (isToday) {
        return sentDate.toLocaleTimeString('ko-KR', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // 어제인지 확인
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = sentDate.toDateString() === yesterday.toDateString();

    if (isYesterday) {
        return `어제 ${sentDate.toLocaleTimeString('ko-KR', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })}`;
    }

    // 일주일 미만
    if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}일 전`;
    }

    // 그 외 (날짜 표시)
    return sentDate.toLocaleDateString('ko-KR', {
        month: 'numeric',
        day: 'numeric'
    });
};