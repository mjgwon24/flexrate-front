'use client';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shimmer = keyframes`
    0% {
        background-position: -468px 0;
    }
    100% {
        background-position: 468px 0;
    }
`;

export const SkeletonConditionBox = styled.div`
  width: 100%;
  height: 120px;
  padding: 20px 30px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background: #f9f9f9;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 468px 100%;
    animation: ${shimmer} 1.8s infinite ease-in-out;
  }
`;

export const ConditionbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const Total = styled.span`
  color: #262626;
  font-size: 1.1rem;
`;

export const ConditionBox = styled.div`
  width: 100%;
  padding: 20px 30px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: #fff;
`;
