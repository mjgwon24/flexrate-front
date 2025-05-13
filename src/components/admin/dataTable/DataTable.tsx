import React, { useEffect, useState } from 'react';

import { css, cx } from '@emotion/css';
import { Table, Pagination } from 'antd';

import {
  rowCellStyle,
  emptyRowStyle,
  customRowHoverStyle,
  lastRowNoBorderStyle,
  EmptyTextWrapper,
  TableWrapper,
  TableTitleWrapper,
  PaginationCenterWrapper,
  SkeletonTableWrapper,
  SkeletonHeader,
  SkeletonHeaderCell,
  SkeletonRow,
  SkeletonCell,
  SkeletonCellContainer,
  SkeletonPagination,
} from './DataTable.style';

interface DataTableProps {
  data: DataType[];
  loading: boolean;
}

interface DataType {
  key: React.Key;
  no: number;
  name: string;
  gender: string;
  birth: string;
  status: string;
  joinDate: string;
  loanCount: number;
  loanStatus: string;
  isEmpty?: boolean;
}

/**
 * 테이블 컴포넌트
 * @since 2025.05.13
 * @author 권민지
 */
const DataTable = ({ data, loading }: DataTableProps) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [current, setCurrent] = React.useState(1);
  const PAGE_SIZE = 8;
  const COLUMN_WIDTHS = {
    no: 30,
    name: 100,
    gender: 80,
    birth: 120,
    status: 80,
    joinDate: 120,
    loanCount: 100,
    loanStatus: 140,
  };
  const SKELETON_COLUMNS = [
    { key: 'no', width: COLUMN_WIDTHS.no },
    { key: 'name', width: COLUMN_WIDTHS.name },
    { key: 'gender', width: COLUMN_WIDTHS.gender },
    { key: 'birth', width: COLUMN_WIDTHS.birth },
    { key: 'status', width: COLUMN_WIDTHS.status },
    { key: 'joinDate', width: COLUMN_WIDTHS.joinDate },
    { key: 'loanCount', width: COLUMN_WIDTHS.loanCount },
    { key: 'loanStatus', width: COLUMN_WIDTHS.loanStatus },
  ];
  const pagedData = data.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const showSkeleton = initialLoading && loading;
  const showAntdLoading = !initialLoading && loading;

  let renderData: DataType[];
  if (data.length === 0) {
    renderData = [];
  } else {
    const emptyRowsCount = PAGE_SIZE - pagedData.length;
    const emptyRows = Array.from({ length: emptyRowsCount }, (_, idx) => ({
      key: `empty-${idx}`,
      no: 0,
      name: '',
      gender: '',
      birth: '',
      status: '',
      joinDate: '',
      loanCount: 0,
      loanStatus: '',
      isEmpty: true,
    }));
    renderData = [...pagedData, ...emptyRows];
  }

  const columns = [
    {
      title: <TableTitleWrapper>No</TableTitleWrapper>,
      dataIndex: 'no',
      key: 'no',
      width: COLUMN_WIDTHS.no,
      align: 'center' as const,
      render: (text: string, record: DataType) => (record.isEmpty ? null : text),
    },
    {
      title: <TableTitleWrapper>이름</TableTitleWrapper>,
      dataIndex: 'name',
      key: 'name',
      width: COLUMN_WIDTHS.name,
      align: 'center' as const,
      render: (text: string, record: DataType) => (record.isEmpty ? null : text),
    },
    {
      title: <TableTitleWrapper>성별</TableTitleWrapper>,
      dataIndex: 'gender',
      key: 'gender',
      width: COLUMN_WIDTHS.gender,
      align: 'center' as const,
      render: (text: string, record: DataType) => (record.isEmpty ? null : text),
    },
    {
      title: <TableTitleWrapper>생년월일</TableTitleWrapper>,
      dataIndex: 'birth',
      key: 'birth',
      width: COLUMN_WIDTHS.birth,
      align: 'center' as const,
      render: (text: string, record: DataType) => (record.isEmpty ? null : text),
    },
    {
      title: <TableTitleWrapper>상태</TableTitleWrapper>,
      dataIndex: 'status',
      key: 'status',
      width: COLUMN_WIDTHS.status,
      align: 'center' as const,
      render: (text: string, record: DataType) => (record.isEmpty ? null : text),
    },
    {
      title: <TableTitleWrapper>가입일</TableTitleWrapper>,
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: COLUMN_WIDTHS.joinDate,
      align: 'center' as const,
      render: (text: string, record: DataType) => (record.isEmpty ? null : text),
    },
    {
      title: <TableTitleWrapper>대출 횟수</TableTitleWrapper>,
      dataIndex: 'loanCount',
      key: 'loanCount',
      width: COLUMN_WIDTHS.loanCount,
      align: 'center' as const,
      render: (text: string, record: DataType) => (record.isEmpty ? null : text),
    },
    {
      title: <TableTitleWrapper>대출 상태</TableTitleWrapper>,
      dataIndex: 'loanStatus',
      key: 'loanStatus',
      width: COLUMN_WIDTHS.loanStatus,
      align: 'center' as const,
      render: (text: string, record: DataType) => (record.isEmpty ? null : text),
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 스켈레톤 UI 렌더링
  const renderSkeleton = () => {
    return (
      <>
        <SkeletonTableWrapper>
          <SkeletonHeader>
            {SKELETON_COLUMNS.map((column) => (
              <SkeletonCellContainer key={column.key} width={column.width}>
                <SkeletonHeaderCell />
              </SkeletonCellContainer>
            ))}
          </SkeletonHeader>

          {[...Array(8)].map((_, index) => (
            <SkeletonRow key={index}>
              {SKELETON_COLUMNS.map((column) => (
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

  if (showSkeleton) {
    return renderSkeleton();
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
          rowClassName={(record, index) =>
            cx(
              css(rowCellStyle),
              css(customRowHoverStyle),
              record.isEmpty && css(emptyRowStyle),
              index === renderData.length - 1 && css(lastRowNoBorderStyle)
            )
          }
          onRow={(record) => ({
            onClick: () => {
              if (!record.isEmpty) {
                console.log('Row clicked:', record);
              }
            },
          })}
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
          pageSize={PAGE_SIZE}
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
