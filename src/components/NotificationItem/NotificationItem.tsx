'use client';

import {
    NotificationContent,
    NotificationIcon,
    NotificationMessage,
    NotificationTime,
    StyledNotificationItem
} from "@/components/NotificationItem/NotificationItem.style";

interface NotificationItemProps {
    id: number;
    message: string;
    time: string;
    isRead: boolean;
    onClick: (id: number) => void;
    delay?: number;
}

const NotificationItem = ({id, message, time, isRead, onClick, delay}: NotificationItemProps) => {
    const handleClick = () => {
        onClick(id);
    };

    return (
        <StyledNotificationItem
            $isRead={isRead}
            onClick={handleClick}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: delay ?? 0}}
        >
            <NotificationIcon $isRead={isRead}>
                <img src="/icons/alert_24.svg" width={20} height={20}/>
            </NotificationIcon>
            <NotificationContent>
                <NotificationMessage $isRead={isRead}>
                    {message}
                </NotificationMessage>
                <NotificationTime>{time}</NotificationTime>
            </NotificationContent>
        </StyledNotificationItem>
    );
};

export default NotificationItem;