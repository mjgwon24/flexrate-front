'use client';

import React, { useState } from 'react';
import { useFilterStore } from '@/stores/filterStore';
import { useCustomersQuery } from '@/hooks/useCustomersQuery';
import Conditionbar from '@/components/admin/conditionbar/Conditionbar';
import DataTable from '@/components/admin/dataTable/DataTable';
import { Input, InputNumber, Select, Space, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import {
  PageContainer,
  ContentColumn,
  FilterRow,
  FilterLabel,
} from './page.style';

const CustomerManagementPage: React.FC = () => {
  const { RangePicker } = DatePicker;
  const {
    name, setName,
    gender, setGender,
    birthRange, setBirthRange,
    userStatus, setUserStatus,
    joinDateRange, setJoinDateRange,
    loanStatus, setLoanStatus,
    transactionCountMin, setTransactionCountMin,
    transactionCountMax, setTransactionCountMax,
  } = useFilterStore();

  // 입력용 임시 필터
  const [tempFilters, setTempFilters] = useState({
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
  const filters = { name, gender, birthRange, userStatus, joinDateRange, loanStatus, transactionCountMin, transactionCountMax };
  const { data, isLoading } = useCustomersQuery(filters, true);

  // 임시 필터 변경 핸들러
  const handleTempFilterChange = (key: string, value: any) => {
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
          <Space wrap size='middle'>
            <FilterRow>
              <FilterLabel>이름</FilterLabel>
              <Input
                placeholder="이름"
                value={tempFilters.name}
                onChange={e => handleTempFilterChange('name', e.target.value)}
                style={{ width: '130px' }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>성별</FilterLabel>
              <Select
                value={tempFilters.gender}
                onChange={e => handleTempFilterChange('gender', e)}
                options={[
                  { value: 'all', label: '모두' },
                  { value: 'female', label: '여성' },
                  { value: 'male', label: '남성' }
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
                onChange={value => handleTempFilterChange('userStatus', value)}
                options={[
                  { value: 'all', label: '모두' },
                  { value: 'active', label: '활성' },
                  { value: 'inactive', label: '비활성' }
                ]}
                style={{ width: 100 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>가입일</FilterLabel>
              <RangePicker
                format="YYYY-MM-DD"
                value={
                  tempFilters.joinDateRange && tempFilters.joinDateRange[0] && tempFilters.joinDateRange[1]
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
                onChange={value => handleTempFilterChange('loanStatus', value)}
                options={[
                  { value: 'all', label: '모두' },
                  { value: 'true', label: '대출중' },
                  { value: 'false', label: '대출중 아님' }
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
                onChange={value => handleTempFilterChange('transactionCountMin', value)}
                style={{ width: '65px' }}
              />
              <p>~</p>
              <InputNumber
                min={0}
                max={100}
                value={tempFilters.transactionCountMax}
                onChange={value => handleTempFilterChange('transactionCountMax', value)}
                style={{ width: '65px' }}
              />
            </FilterRow>
          </Space>

          <Button type="primary" onClick={handleSearchClick}>
            조회
          </Button>
        </Conditionbar>

        <DataTable data={data?.list ?? []} loading={isLoading} />
      </ContentColumn>
    </PageContainer>
  );
}

export default CustomerManagementPage;
