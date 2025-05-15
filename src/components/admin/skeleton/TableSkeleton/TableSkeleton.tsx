import React from 'react';

import {
  SkeletonTableWrapper,
  SkeletonHeader,
  SkeletonHeaderCell,
  SkeletonRow,
  SkeletonCell,
  SkeletonCellContainer,
  SkeletonPagination,
} from './TableSkeleton.style';

interface TableSkeletonProps {
  columns: Array<{ key: string; width: number }>;
  rowCount?: number;
}

/**
 * 테이블 스켈레톤 UI 컴포넌트
 * @since 2025.05.13
 * @author 권민지
 */
const TableSkeleton = ({ columns, rowCount = 8 }: TableSkeletonProps) => {
  return (
    <>
      <SkeletonTableWrapper>
        <SkeletonHeader>
          {columns.map((column) => (
            <SkeletonCellContainer key={column.key} width={column.width}>
              <SkeletonHeaderCell />
            </SkeletonCellContainer>
          ))}
        </SkeletonHeader>

        {[...Array(rowCount)].map((_, index) => (
          <SkeletonRow key={index}>
            {columns.map((column) => (
              <SkeletonCellContainer key={column.key} width={column.width}>
                <SkeletonCell />
              </SkeletonCellContainer>
            ))}
          </SkeletonRow>
        ))}
      </SkeletonTableWrapper>

      <SkeletonPagination />
    </>
  );
};

export default TableSkeleton;
