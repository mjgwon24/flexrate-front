'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TableWrapper = styled.div`
    border-radius: 8px;
    border: 1px solid #DBDBDB;
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
        background: #008EFF0F !important;
    }
`;

export const lastRowNoBorderStyle = css`
  & > .ant-table-cell {
    border-bottom: none !important;
  }
`;