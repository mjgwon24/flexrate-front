'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
`;

export const EmptyTextWrapper = styled.div`
  text-align: center;
  min-height: 408px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserDetailButtonWrapper = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const rowCellStyle = css`
  .ant-table-cell {
    height: 55px;
    min-height: 100px;
    max-height: 54px;
    vertical-align: middle;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
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
