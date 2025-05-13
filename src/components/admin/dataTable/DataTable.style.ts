'use client';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const TableWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  overflow: hidden;
  background: #fff;
`;

export const TableTitleWrapper = styled.div`
  text-align: center;
`;

export const PaginationCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

export const EmptyTextWrapper = styled.div`
  text-align: center;
  min-height: 408px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const rowCellStyle = css`
  height: 54px;
  min-height: 54px;
  max-height: 54px;
  padding-top: 0;
  padding-bottom: 0;
  vertical-align: middle;
`;

export const emptyRowStyle = css`
  & .ant-table-cell {
    border: none !important;
    background: transparent !important;
    pointer-events: none;
  }
`;

export const customRowHoverStyle = css`
  &:hover > .ant-table-cell {
    background: #008eff0f !important;
  }
`;

export const lastRowNoBorderStyle = css`
  & > .ant-table-cell {
    border-bottom: none !important;
  }
`;

export const SkeletonTableWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  overflow: hidden;
  background: #fff;
`;

export const SkeletonHeader = styled.div`
  height: 54px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

export const SkeletonRow = styled.div`
  height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 16px;
`;

export const SkeletonCellContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: center;
  padding: 0 8px;
  flex-shrink: 0;
`;

export const SkeletonHeaderCell = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

export const SkeletonCell = styled.div`
  width: 100%;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

export const SkeletonPagination = styled.div`
  width: 300px;
  height: 32px;
  margin: 24px auto;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;
