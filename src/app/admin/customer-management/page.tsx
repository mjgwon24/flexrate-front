'use client';

import React, { useEffect, useState } from 'react';

import { Input, InputNumber, Select, Space, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import Conditionbar from '@/components/admin/Conditionbar/Conditionbar';
import DataTable from '@/components/admin/DataTable/DataTable';
import { useCustomersQuery } from '@/hooks/useCustomersQuery';
import { useFilterStore } from '@/stores/filterStore';
import type { FilterType } from '@/types/filter.type';

import { PageContainer, ContentColumn, FilterRow, FilterLabel } from './page.style';

/**
 * 관리자 페이지 - 고객 관리 메뉴
 * @since 2025.05.12
 * @author 권민지
 */
const CustomerManagementPage = () => {
  const PAGE_SIZE = 8;
  const { RangePicker } = DatePicker;
  const router = useRouter();
  const {
    name,
    setName,
    sex,
    setSex,
    birthDateRange,
    setBirthRange,
    memberStatus,
    setMemberStatus,
    createdDateRange,
    setCreatedDateRange,
    hasLoan,
    setHasLoan,
    transactionCountMin,
    setTransactionCountMin,
    transactionCountMax,
    setTransactionCountMax,
  } = useFilterStore();

  // 입력용 임시 필터
  const [tempFilters, setTempFilters] = useState<FilterType>({
    name,
    sex,
    birthDateRange,
    memberStatus,
    createdDateRange,
    hasLoan,
    transactionCountMin,
    transactionCountMax,
  });

  // 실제 필터
  const filters = {
    name,
    sex,
    birthDateRange,
    memberStatus,
    createdDateRange,
    hasLoan,
    transactionCountMin,
    transactionCountMax,
  };

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
    setSex(tempFilters.sex);
    setBirthRange(tempFilters.birthDateRange);
    setMemberStatus(tempFilters.memberStatus);
    setCreatedDateRange(tempFilters.createdDateRange);
    setHasLoan(tempFilters.hasLoan);
    setTransactionCountMin(tempFilters.transactionCountMin);
    setTransactionCountMax(tempFilters.transactionCountMax);
  };

  const CUSTOMER_COLUMN_WIDTHS = {
    no: 30,
    name: 90,
    email: 150,
    sex: 80,
    birthDate: 120,
    memberStatus: 80,
    createdAt: 120,
    transactionCount: 90,
    hasLoan: 100,
    userId: 60,
  };

  const CUSTOMER_COLUMN_METAS = [
    { title: 'No', dataIndex: 'no', key: 'no' },
    { title: '이름', dataIndex: 'name', key: 'name' },
    { title: '이메일', dataIndex: 'email', key: 'email' },
    { title: '성별', dataIndex: 'sex', key: 'sex' },
    { title: '생년월일', dataIndex: 'birthDate', key: 'birthDate' },
    { title: '상태', dataIndex: 'memberStatus', key: 'memberStatus' },
    { title: '가입일', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '대출 횟수', dataIndex: 'transactionCount', key: 'transactionCount' },
    { title: '대출 상태', dataIndex: 'hasLoan', key: 'hasLoan' },
    { title: '', dataIndex: 'userId', key: 'userId' },
  ] as const;

  // adminToken 반환 (임시로 localStorage 반환)
  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  useEffect(() => {
    if (!adminToken) {
      router.replace('/no-access');
    }
  }, [adminToken, router]);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useCustomersQuery(filters, adminToken || '', page - 1, PAGE_SIZE);

  console.log('data: ', data);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
                value={tempFilters.sex}
                onChange={(e) => handleTempFilterChange('sex', e)}
                options={[
                  { value: 'ALL', label: '모두' },
                  { value: 'FEMALE', label: '여성' },
                  { value: 'MALE', label: '남성' },
                ]}
                style={{ width: 80 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>생년월일</FilterLabel>
              <RangePicker
                format="YYYY-MM-DD"
                value={
                  tempFilters.birthDateRange &&
                  tempFilters.birthDateRange[0] &&
                  tempFilters.birthDateRange[1]
                    ? [dayjs(tempFilters.birthDateRange[0]), dayjs(tempFilters.birthDateRange[1])]
                    : null
                }
                onChange={(_, dateStrings: [string, string]) =>
                  handleTempFilterChange('birthDateRange', dateStrings)
                }
                style={{ width: '240px' }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>사용자 상태</FilterLabel>
              <Select
                value={tempFilters.memberStatus}
                onChange={(value) => handleTempFilterChange('memberStatus', value)}
                options={[
                  { value: 'ALL', label: '모두' },
                  { value: 'ACTIVE', label: '활성' },
                  { value: 'WITHDRAWN', label: '탈퇴' },
                  { value: 'SUSPENDED', label: '정지' },
                ]}
                style={{ width: 100 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>가입일</FilterLabel>
              <RangePicker
                format="YYYY-MM-DD"
                value={
                  tempFilters.createdDateRange &&
                  tempFilters.createdDateRange[0] &&
                  tempFilters.createdDateRange[1]
                    ? [
                        dayjs(tempFilters.createdDateRange[0]),
                        dayjs(tempFilters.createdDateRange[1]),
                      ]
                    : null
                }
                onChange={(_, dateStrings: [string, string]) =>
                  handleTempFilterChange('createdDateRange', dateStrings)
                }
                style={{ width: '240px' }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>대출중 여부</FilterLabel>
              <Select
                value={tempFilters.hasLoan}
                onChange={(value) => handleTempFilterChange('hasLoan', value)}
                options={[
                  { value: 'ALL', label: '모두' },
                  { value: 'TRUE', label: '대출중' },
                  { value: 'FALSE', label: '대출중 아님' },
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

        <DataTable
          data={data?.members || []}
          loading={isLoading}
          columnMetas={[...CUSTOMER_COLUMN_METAS]}
          columnWidths={CUSTOMER_COLUMN_WIDTHS}
          linkPrefix="/admin/customer-management/"
          paginationInfo={{
            currentPage: page,
            pageSize: data?.paginationInfo.pageSize || PAGE_SIZE,
            totalElements: data?.paginationInfo.totalElements || 0,
            totalPages: data?.paginationInfo.totalPages || 0,
            onChange: handlePageChange,
          }}
        />
      </ContentColumn>
    </PageContainer>
  );
};

export default CustomerManagementPage;
