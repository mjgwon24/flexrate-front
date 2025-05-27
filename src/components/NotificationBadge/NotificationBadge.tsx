import React from 'react';

import Image from 'next/image';

import {NotificationContainer, Badge, SmallBadge} from '@/components/NotificationBadge/NotificationBadge.style';
import {NotificationBadgeProps} from '@/types/notification.badge.type';

const NotificationBadge = ({
                               unreadCount,
                               onClick,
                               showCount = true,
                           }: NotificationBadgeProps) => {
    return (
        <NotificationContainer onClick={onClick}>
            <Image
                src="/icons/alert_36.svg"
                width={36}
                height={36}
                alt="알림"
            />
            {unreadCount > 0 &&
                (showCount ? (
                    <Badge>{unreadCount > 99 ? '99+' : unreadCount}</Badge>
                ) : (
                    <SmallBadge/>
                ))}
        </NotificationContainer>
    );
};

export default NotificationBadge;
