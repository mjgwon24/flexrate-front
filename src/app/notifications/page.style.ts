import styled from "@emotion/styled";

import {semanticColor} from "@/styles/colors";

export const Wrapper = styled.div`
    height: 85vh;
    overflow-y: auto;
`;

export const TopSection = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px 11px;
    height: 48px;
`;

export const MainContainer = styled.div`
    margin: 0 auto 40px auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 11px 11px 80px 11px;
`;

export const NotificationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
`;

export const EmptyIcon = styled.div`
    margin-bottom: 16px;
`;

export const EmptyText = styled.div`
    font-size: 16px;
    color: ${semanticColor.text.normal.sub3};
`;

export const LoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 10px;

    .spinner {
        width: 24px;
        height: 24px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #007AFF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    p {
        color: #666;
        font-size: 14px;
        margin: 0;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const ErrorMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 10px;
    background-color: #ffebee;
    border-radius: 8px;
    border: 1px solid #ffcdd2;

    p {
        color: #c62828;
        font-size: 14px;
        margin: 0 0 10px 0;
        text-align: center;
    }

    button {
        background-color: #007AFF;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
            opacity: 0.8;
        }

        &:active {
            opacity: 0.6;
        }
    }
`;