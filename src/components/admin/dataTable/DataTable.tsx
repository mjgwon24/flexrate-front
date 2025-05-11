/** @jsxImportSource @emotion/react */
import React from 'react';
import { Table, Pagination } from 'antd';
import { css, cx } from '@emotion/css';
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

interface DataTableProps {
  data: any[];
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

const sampleData: DataType[] = [
  {
    key: 1,
    no: 1,
    name: '김철수',
    gender: '남성',
    birth: '1990-01-15',
    status: '활성',
    joinDate: '2022-01-01',
    loanCount: 2,
    loanStatus: '대출중',
  },
  {
    key: 2,
    no: 2,
    name: '이영희',
    gender: '여성',
    birth: '1988-05-23',
    status: '비활성',
    joinDate: '2021-03-14',
    loanCount: 0,
    loanStatus: '대출중 아님',
  },
  {
    key: 3,
    no: 3,
    name: '박민수',
    gender: '남성',
    birth: '1992-09-10',
    status: '활성',
    joinDate: '2022-07-21',
    loanCount: 1,
    loanStatus: '대출중',
  },
  {
    key: 4,
    no: 4,
    name: '최지은',
    gender: '여성',
    birth: '1995-12-30',
    status: '활성',
    joinDate: '2023-02-18',
    loanCount: 3,
    loanStatus: '대출중 아님',
  },
  {
    key: 5,
    no: 5,
    name: '정우성',
    gender: '남성',
    birth: '1986-04-07',
    status: '비활성',
    joinDate: '2020-11-11',
    loanCount: 0,
    loanStatus: '대출중 아님',
  },
  {
    key: 6,
    no: 6,
    name: '한가인',
    gender: '여성',
    birth: '1993-08-19',
    status: '활성',
    joinDate: '2021-06-25',
    loanCount: 4,
    loanStatus: '대출중',
  },
  {
    key: 7,
    no: 7,
    name: '오세훈',
    gender: '남성',
    birth: '1991-10-05',
    status: '활성',
    joinDate: '2022-10-30',
    loanCount: 2,
    loanStatus: '대출중',
  },
  {
    key: 8,
    no: 8,
    name: '서지수',
    gender: '여성',
    birth: '1994-02-11',
    status: '비활성',
    joinDate: '2020-12-09',
    loanCount: 1,
    loanStatus: '대출중 아님',
  },
  {
    key: 9,
    no: 9,
    name: '장동건',
    gender: '남성',
    birth: '1987-07-29',
    status: '활성',
    joinDate: '2021-05-13',
    loanCount: 5,
    loanStatus: '대출중',
  },
  {
    key: 10,
    no: 10,
    name: '이수지',
    gender: '여성',
    birth: '1996-03-22',
    status: '비활성',
    joinDate: '2023-01-05',
    loanCount: 0,
    loanStatus: '대출중 아님',
  },
  {
    key: 11,
    no: 11,
    name: '김영희',
    gender: '여성',
    birth: '1990-11-13',
    status: '활성',
    joinDate: '2022-04-18',
    loanCount: 1,
    loanStatus: '대출중',
  },
  {
    key: 12,
    no: 12,
    name: '최민수',
    gender: '남성',
    birth: '1989-06-17',
    status: '비활성',
    joinDate: '2020-09-21',
    loanCount: 2,
    loanStatus: '대출중 아님',
  },
  {
    key: 13,
    no: 13,
    name: '박지성',
    gender: '남성',
    birth: '1985-12-25',
    status: '활성',
    joinDate: '2021-08-15',
    loanCount: 3,
    loanStatus: '대출중',
  },
  {
    key: 14,
    no: 14,
    name: '손예진',
    gender: '여성',
    birth: '1992-02-02',
    status: '비활성',
    joinDate: '2022-12-12',
    loanCount: 0,
    loanStatus: '대출중 아님',
  },
  {
    key: 15,
    no: 15,
    name: '유재석',
    gender: '남성',
    birth: '1988-10-10',
    status: '활성',
    joinDate: '2023-03-01',
    loanCount: 4,
    loanStatus: '대출중',
  },
  {
    key: 16,
    no: 16,
    name: '강호동',
    gender: '남성',
    birth: '1987-05-20',
    status: '비활성',
    joinDate: '2020-07-07',
    loanCount: 1,
    loanStatus: '대출중 아님',
  },
  {
    key: 17,
    no: 17,
    name: '장나라',
    gender: '여성',
    birth: '1995-11-09',
    status: '활성',
    joinDate: '2021-11-30',
    loanCount: 2,
    loanStatus: '대출중',
  },
];

const PAGE_SIZE = 8;

const DataTable: React.FC<DataTableProps> = ({ data, loading }) => {
  const tableData = data && data.length > 0 ? data : sampleData;
  const [current, setCurrent] = React.useState(1);
  const pagedData = tableData.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  let renderData: DataType[];

  if (tableData.length === 0) {
    renderData = [];
  } else {
    const emptyRowsCount = PAGE_SIZE - pagedData.length;
    const emptyRows = Array.from({ length: emptyRowsCount }, (_, idx) => ({
      key: `empty-${idx}`,
      no: '',
      name: '',
      gender: '',
      birth: '',
      status: '',
      joinDate: '',
      loanCount: '',
      loanStatus: '',
      isEmpty: true,
    }));
    renderData = [...pagedData, ...emptyRows];
  }

  return (
    <>
      <TableWrapper>
        <Table<DataType>
          dataSource={renderData}
          loading={loading}
          pagination={false}
          style={{ minHeight: '495px' }}
          scroll={{ x: 'max-content' }}
          locale={{
            emptyText: (
              <EmptyTextWrapper>
                <p>조회된 데이터가 없습니다.</p>
              </EmptyTextWrapper>
            ),
          }}
          rowKey="key"
          rowClassName={(record, index) =>
            cx(
              css(rowCellStyle),
              css(customRowHoverStyle),
              record.isEmpty && css(emptyRowStyle),
              index === renderData.length - 1 && css(lastRowNoBorderStyle)
            )
          }
        >
          <Table.Column
            title={<TableTitleWrapper>No</TableTitleWrapper>}
            dataIndex="no"
            key="no"
            width={COLUMN_WIDTHS.no}
            align="center"
            render={(text, record: any) => record.isEmpty ? null : text}
          />
          <Table.Column
            title={<TableTitleWrapper>이름</TableTitleWrapper>}
            dataIndex="name"
            key="name"
            width={COLUMN_WIDTHS.name}
            align="center"
            render={(text, record: any) => record.isEmpty ? null : text}
          />
          <Table.Column
            title={<TableTitleWrapper>성별</TableTitleWrapper>}
            dataIndex="gender"
            key="gender"
            width={COLUMN_WIDTHS.gender}
            align="center"
            render={(text, record: any) => record.isEmpty ? null : text}
          />
          <Table.Column
            title={<TableTitleWrapper>생년월일</TableTitleWrapper>}
            dataIndex="birth"
            key="birth"
            width={COLUMN_WIDTHS.birth}
            align="center"
            render={(text, record: any) => record.isEmpty ? null : text}
          />
          <Table.Column
            title={<TableTitleWrapper>상태</TableTitleWrapper>}
            dataIndex="status"
            key="status"
            width={COLUMN_WIDTHS.status}
            align="center"
            render={(text, record: any) => record.isEmpty ? null : text}
          />
          <Table.Column
            title={<TableTitleWrapper>가입일</TableTitleWrapper>}
            dataIndex="joinDate"
            key="joinDate"
            width={COLUMN_WIDTHS.joinDate}
            align="center"
            render={(text, record: any) => record.isEmpty ? null : text}
          />
          <Table.Column
            title={<TableTitleWrapper>대출 횟수</TableTitleWrapper>}
            dataIndex="loanCount"
            key="loanCount"
            width={COLUMN_WIDTHS.loanCount}
            align="center"
            render={(text, record: any) => record.isEmpty ? null : text}
          />
          <Table.Column
            title={<TableTitleWrapper>대출 중 여부</TableTitleWrapper>}
            dataIndex="loanStatus"
            key="loanStatus"
            width={COLUMN_WIDTHS.loanStatus}
            align="center"
            render={(text, record: any) => record.isEmpty ? null : text}
          />
        </Table>
      </TableWrapper>
      <PaginationCenterWrapper>
        <Pagination
          pageSize={PAGE_SIZE}
          current={current}
          total={tableData.length}
          onChange={setCurrent}
          showSizeChanger={false}
        />
      </PaginationCenterWrapper>
    </>
  );
};

export default DataTable;