import styled from "@emotion/styled";
import {motion} from "framer-motion";

import {semanticColor} from "@/styles/colors";

const shouldForwardProp = (prop: string) => prop !== "$isRead";

export const StyledNotificationItem = styled(motion.div, {shouldForwardProp})<{ $isRead: boolean }>`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background-color: ${({$isRead}) =>
            $isRead ? semanticColor.bg.default : semanticColor.bgBtn.active.secondary};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
`;

export const NotificationIcon = styled.div<{ $isRead: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({$isRead}) =>
            $isRead ? semanticColor.bgBtn.inactive.sub1 : semanticColor.bgBtn.active.tertiary};
    flex-shrink: 0;
`;

export const NotificationContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const NotificationMessage = styled.div<{ $isRead: boolean }>`
    font-size: 15px;
    font-weight: ${({$isRead}) => ($isRead ? 400 : 500)};
    color: ${({$isRead}) =>
            $isRead ? semanticColor.text.normal.sub2 : semanticColor.text.normal.primary};
    line-height: 1.4;
`;

export const NotificationTime = styled.div`
    font-size: 13px;
    color: ${semanticColor.text.normal.sub3};
`;
