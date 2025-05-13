'use client';

import React, { useEffect, useState } from 'react';

import { css, cx } from '@emotion/css';
import { Table, Pagination } from 'antd';

import TableSkeleton from '@/components/admin/skeleton/TableSkeleton/TableSkeleton';

import {
  rowCellStyle,
  emptyRowStyle,
  customRowHoverStyle,
  lastRowNoBorderStyle,
  EmptyTextWrapper,
  TableWrapper,
  TableTitleWrapper,
  PaginationCenterWrapper,
} from './DataTable.style';

interface ColumnMeta<T> {
  title: string;
  dataIndex: keyof T;
  key: keyof T & string;
}

interface DataTableProps<T extends { key: React.Key; isEmpty?: boolean }> {
  data: T[];
  loading: boolean;
  columnMetas: ColumnMeta<T>[];
  columnWidths: Record<string, number>;
  pageSize?: number;
}

/**
 * 테이블 컴포넌트
 * @param data - 데이터 배열
 * @param loading - 로딩 상태
 * @param columnMetas - 컬럼 메타 정보 배열
 * @param columnWidths - 컬럼 너비 정보 객체
 * @param pageSize - 페이지 크기 (기본값: 8)
 *
 * @since 2025.05.13
 * @author 권민지
 */
const DataTable = <T extends { key: React.Key; isEmpty?: boolean }>({
  data,
  loading,
  columnMetas,
  columnWidths,
  pageSize = 8,
}: DataTableProps<T>) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [current, setCurrent] = useState(1);

  const columns = columnMetas.map((meta) => ({
    title: <TableTitleWrapper>{meta.title}</TableTitleWrapper>,
    dataIndex: meta.dataIndex as Extract<keyof T, string | number>, // 타입 좁히기// 2. skeleton columns 생성
    key: meta.key,
    width: columnWidths[meta.key],
    align: 'center' as const,
    render: (text: string, record: T) => (record.isEmpty ? null : text),
  }));

  const skeletonColumns = columnMetas.map((meta) => ({
    key: meta.key,
    width: columnWidths[meta.key],
  }));

  // 데이터 페이지 처리 및 빈 row 처리
  const pagedData = data.slice((current - 1) * pageSize, current * pageSize);
  let renderData: T[];
  if (data.length === 0) {
    renderData = [];
  } else {
    const emptyRowsCount = pageSize - pagedData.length;
    const emptyRows = Array.from({ length: emptyRowsCount }, (_, idx) => ({
      ...Object.fromEntries(columnMetas.map((meta) => [meta.dataIndex, ''])),
      key: `empty-${idx}`,
      isEmpty: true,
    })) as T[];
    renderData = [...pagedData, ...emptyRows];
  }

  const showSkeleton = initialLoading && loading;
  const showAntdLoading = !initialLoading && loading;

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (showSkeleton) {
    return <TableSkeleton columns={skeletonColumns} rowCount={pageSize} />;
  }

  return (
    <>
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={renderData}
          pagination={false}
          loading={showAntdLoading}
          style={{ minHeight: '495px' }}
          scroll={{ x: 'max-content' }}
          rowClassName={(_, index) =>
            cx(
              css(rowCellStyle),
              css(customRowHoverStyle),
              renderData[index]?.isEmpty && css(emptyRowStyle),
              index === renderData.length - 1 && css(lastRowNoBorderStyle)
            )
          }
          locale={{
            emptyText: (
              <EmptyTextWrapper>
                <span>데이터가 없습니다.</span>
              </EmptyTextWrapper>
            ),
          }}
        />
      </TableWrapper>
      <PaginationCenterWrapper>
        <Pagination
          pageSize={pageSize}
          current={current}
          total={data.length}
          onChange={setCurrent}
          showSizeChanger={false}
        />
      </PaginationCenterWrapper>
    </>
  );
};

export default DataTable;
