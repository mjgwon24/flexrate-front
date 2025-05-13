'use client';

import React, { useState } from 'react';

import { Input, InputNumber, Select, Space, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';

import Conditionbar from '@/components/admin/conditionbar/Conditionbar';
import DataTable from '@/components/admin/dataTable/DataTable';
import { useCustomersQuery } from '@/hooks/useCustomersQuery';
import { useFilterStore } from '@/stores/filterStore';
import type { FilterType } from '@/types/filter.type';

import { PageContainer, ContentColumn, FilterRow, FilterLabel } from './page.style';

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
 * 관리자 페이지 - 고객 관리 메뉴
 * @since 2025.05.12
 * @author 권민지
 */
const CustomerManagementPage = () => {
  const { RangePicker } = DatePicker;
  const {
    name,
    setName,
    gender,
    setGender,
    birthRange,
    setBirthRange,
    userStatus,
    setUserStatus,
    joinDateRange,
    setJoinDateRange,
    loanStatus,
    setLoanStatus,
    transactionCountMin,
    setTransactionCountMin,
    transactionCountMax,
    setTransactionCountMax,
  } = useFilterStore();

  // 입력용 임시 필터
  const [tempFilters, setTempFilters] = useState<FilterType>({
    name,
    gender,
    birthRange,
    userStatus,
    joinDateRange,
    loanStatus,
    transactionCountMin,
    transactionCountMax,
  });

  // 실제 필터
  const filters = {
    name,
    gender,
    birthRange,
    userStatus,
    joinDateRange,
    loanStatus,
    transactionCountMin,
    transactionCountMax,
  };
  const { data, isLoading } = useCustomersQuery(filters);

  // 더미 데이터
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

  // 임시 필터 변경 핸들러
  const handleTempFilterChange = <K extends keyof FilterType>(key: K, value: FilterType[K]) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 조회 버튼 클릭 핸들러
  const handleSearchClick = () => {
    setName(tempFilters.name);
    setGender(tempFilters.gender);
    setBirthRange(tempFilters.birthRange);
    setUserStatus(tempFilters.userStatus);
    setJoinDateRange(tempFilters.joinDateRange);
    setLoanStatus(tempFilters.loanStatus);
    setTransactionCountMin(tempFilters.transactionCountMin);
    setTransactionCountMax(tempFilters.transactionCountMax);
  };

  return (
    <PageContainer>
      <ContentColumn>
        <Conditionbar title="고객 관리" totalElements="72명">
          <Space wrap size="middle">
            <FilterRow>
              <FilterLabel>이름</FilterLabel>
              <Input
                placeholder="이름"
                value={tempFilters.name}
                onChange={(e) => handleTempFilterChange('name', e.target.value)}
                style={{ width: '130px' }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>성별</FilterLabel>
              <Select
                value={tempFilters.gender}
                onChange={(e) => handleTempFilterChange('gender', e)}
                options={[
                  { value: 'all', label: '모두' },
                  { value: 'female', label: '여성' },
                  { value: 'male', label: '남성' },
                ]}
                style={{ width: 80 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>생년월일</FilterLabel>
              <RangePicker
                format="YYYY-MM-DD"
                value={
                  tempFilters.birthRange && tempFilters.birthRange[0] && tempFilters.birthRange[1]
                    ? [dayjs(tempFilters.birthRange[0]), dayjs(tempFilters.birthRange[1])]
                    : null
                }
                onChange={(_, dateStrings: [string, string]) =>
                  handleTempFilterChange('birthRange', dateStrings)
                }
                style={{ width: '240px' }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>사용자 상태</FilterLabel>
              <Select
                value={tempFilters.userStatus}
                onChange={(value) => handleTempFilterChange('userStatus', value)}
                options={[
                  { value: 'all', label: '모두' },
                  { value: 'active', label: '활성' },
                  { value: 'inactive', label: '비활성' },
                ]}
                style={{ width: 100 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>가입일</FilterLabel>
              <RangePicker
                format="YYYY-MM-DD"
                value={
                  tempFilters.joinDateRange &&
                  tempFilters.joinDateRange[0] &&
                  tempFilters.joinDateRange[1]
                    ? [dayjs(tempFilters.joinDateRange[0]), dayjs(tempFilters.joinDateRange[1])]
                    : null
                }
                onChange={(_, dateStrings: [string, string]) =>
                  handleTempFilterChange('joinDateRange', dateStrings)
                }
                style={{ width: '240px' }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>대출중 여부</FilterLabel>
              <Select
                value={tempFilters.loanStatus}
                onChange={(value) => handleTempFilterChange('loanStatus', value)}
                options={[
                  { value: 'all', label: '모두' },
                  { value: 'true', label: '대출중' },
                  { value: 'false', label: '대출중 아님' },
                ]}
                style={{ width: 120 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>거래내역 횟수</FilterLabel>
              <InputNumber
                min={0}
                max={100}
                value={tempFilters.transactionCountMin}
                onChange={(value) => handleTempFilterChange('transactionCountMin', value)}
                style={{ width: '65px' }}
              />
              <p>~</p>
              <InputNumber
                min={0}
                max={100}
                value={tempFilters.transactionCountMax}
                onChange={(value) => handleTempFilterChange('transactionCountMax', value)}
                style={{ width: '65px' }}
              />
            </FilterRow>
          </Space>

          <Button type="primary" onClick={handleSearchClick}>
            조회
          </Button>
        </Conditionbar>

        {/*<DataTable data={data?.list ?? []} loading={isLoading} />*/}
        <DataTable data={sampleData} loading={isLoading} />
      </ContentColumn>
    </PageContainer>
  );
};

export default CustomerManagementPage;
