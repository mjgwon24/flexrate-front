export interface NotificationBadgeProps {
    unreadCount: number;
    onClick: () => void;
    showCount?: boolean;
}