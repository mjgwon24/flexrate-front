'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { css, cx } from '@emotion/css';
import { Table, Pagination } from 'antd';
import { useRouter } from 'next/navigation';

import UserDetailButton from '@/assets/icons/userDetailButton.svg';
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
  UserDetailButtonWrapper,
} from './DataTable.style';

interface ColumnMeta {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
}

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  onChange: (page: number) => void;
}

interface DataTableProps<T extends { key: React.Key; isEmpty?: boolean; userId?: number }> {
  data: T[];
  loading: boolean;
  columnMetas: ColumnMeta[];
  pageSize?: number;
  linkPrefix?: string;
  paginationInfo?: PaginationInfo;
}

const PAGE_SIZE = 8;
const TABLE_MIN_HEIGHT = 495;
const TABLE_MIN_WIDTH = 1020;

/**
 * 테이블 컴포넌트
 * @param data - 데이터 배열
 * @param loading - 로딩 상태
 * @param columnMetas - 컬럼 메타 정보 배열
 * @param columnWidths - 컬럼 너비 정보 객체
 * @param linkPrefix - 링크 접두사
 * @param paginationInfo - 페이지네이션 정보 객체
 * @since 2025.05.13
 * @author 권민지
 */
const DataTable = <T extends { key: React.Key; isEmpty?: boolean; userId: number }>({
  data,
  loading,
  columnMetas,
  linkPrefix,
  paginationInfo,
}: DataTableProps<T>) => {
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const currentPage = paginationInfo?.currentPage ?? 0;
  const pageSize = paginationInfo?.pageSize ?? PAGE_SIZE;
  const totalElements = paginationInfo?.totalElements ?? 0;
  const showSkeleton = initialLoading;
  const showAntdLoading = !initialLoading && loading;
  const skeletonColumns = useMemo(
    () =>
      columnMetas.map((meta) => ({
        key: meta.key,
        width: meta.width ?? 100,
      })),
    [columnMetas]
  );

  const columns = useMemo(
    () =>
      columnMetas.map((meta) => {
        if (meta.key === 'userId') {
          return {
            title: <TableTitleWrapper>{meta.title}</TableTitleWrapper>,
            dataIndex: meta.dataIndex,
            key: meta.key,
            width: meta.width,
            align: 'center' as const,
            render: (_: unknown, record: T) =>
              record.isEmpty ? null : (
                <UserDetailButtonWrapper
                  aria-label="상세 페이지 이동"
                  onClick={() => {
                    if (record.userId) {
                      router.push(`${linkPrefix}${record.userId}`);
                    }
                  }}
                >
                  <UserDetailButton width={34} />
                </UserDetailButtonWrapper>
              ),
          };
        }
        return {
          title: <TableTitleWrapper>{meta.title}</TableTitleWrapper>,
          dataIndex: meta.dataIndex,
          key: meta.key,
          width: meta.width,
          align: 'center' as const,
          render: (text: string, record: T) => (record.isEmpty ? null : text),
        };
      }),
    [columnMetas, linkPrefix, router]
  );

  // 데이터 페이지 처리 및 빈 row 처리
  const renderData: T[] = useMemo(() => {
    if (!data || data.length === 0) return [];
    const emptyRowsCount = pageSize - data.length;
    const emptyRows = Array.from({ length: emptyRowsCount }, (_, idx) => ({
      ...Object.fromEntries(columnMetas.map((meta) => [meta.dataIndex, ''])),
      key: `empty-${currentPage}-${idx}`,
      isEmpty: true,
    })) as T[];
    return [...data, ...emptyRows];
  }, [data, pageSize, columnMetas, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 100);
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
          style={{ minHeight: TABLE_MIN_HEIGHT, minWidth: TABLE_MIN_WIDTH }}
          scroll={{ x: 'max-content' }}
          rowClassName={(_, index) =>
            cx(
              css(rowCellStyle),
              css(customRowHoverStyle),
              renderData?.[index]?.isEmpty && css(emptyRowStyle),
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
          current={currentPage}
          total={totalElements}
          onChange={(page) => {
            if (paginationInfo?.onChange) {
              paginationInfo.onChange(page);
            }
          }}
          showSizeChanger={false}
        />
      </PaginationCenterWrapper>
    </>
  );
};

export default DataTable;
