'use client';

import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Input, InputNumber, Select, Space, Button, DatePicker, Modal, Form, message } from 'antd';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import Conditionbar from '@/components/admin/Conditionbar/Conditionbar';
import DataTable from '@/components/admin/DataTable/DataTable';
import {
  LoanApplicationTableRow,
  useLoanApplicationsQuery,
} from '@/hooks/useLoanApplicationsQuery';
import { usePatchLoanStatus } from '@/hooks/usePatchLoanStatus';
import { useLoanFilterStore } from '@/stores/loanFilterStore';
import type { LoanFilterType } from '@/types/loan.filter.type';
import { filtersToLoanApplicationParams } from '@/utils/loanApplicationParams';

import { PageContainer, ContentColumn, FilterRow, FilterLabel } from './page.style';

const PAGE_SIZE = 8;

const LOAN_APPLICATION_COLUMN_METAS = [
  { title: 'No', dataIndex: 'no', key: 'no', width: 50, editable: false },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    editable: true,
    inputType: 'select',
    options: [
      { value: 'PRE_APPLIED', label: '신청 접수' },
      { value: 'PENDING', label: '심사중' },
      { value: 'REJECTED', label: '거절됨' },
      { value: 'EXECUTED', label: '실행됨' },
      { value: 'COMPLETED', label: '상환 완료' },
    ],
  },
  {
    title: '신청일',
    dataIndex: 'applicationDate',
    key: 'applicationDate',
    width: 120,
    editable: false,
  },
  { title: '신청자', dataIndex: 'applicantName', key: 'applicantName', width: 90, editable: false },
  {
    title: '대출 가능 한도',
    dataIndex: 'loanLimit',
    key: 'loanLimit',
    width: 120,
    editable: false,
  },
  {
    title: '초기 대출 금리',
    dataIndex: 'initialInterestRate',
    key: 'initialInterestRate',
    width: 120,
    editable: false,
  },
  {
    title: '기존 대출 횟수',
    dataIndex: 'previousLoanCount',
    key: 'previousLoanCount',
    width: 120,
    editable: false,
  },
  {
    title: '신규/연장/재가입 여부',
    dataIndex: 'loanType',
    key: 'loanType',
    width: 150,
    editable: false,
  },
  { title: '', dataIndex: 'userId', key: 'userId', width: 60, editable: false },
] as const;

/**
 * 관리자 페이지 - 대출 신청 현황 메뉴
 * @since 2025.05.18
 * @author 허연규
 */
const AdminLoanApplicationPage = () => {
  const { RangePicker } = DatePicker;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusChangeForm] = Form.useForm();
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    record: LoanApplicationTableRow;
    newStatus: string;
  } | null>(null);
  const [page, setPage] = useState(1);

  const loanFilterStore = useLoanFilterStore();
  const {
    status,
    setStatus,
    applicationDateRange,
    setApplicationDateRange,
    applicantName,
    setApplicantName,
    loanLimitMin,
    setLoanLimitMin,
    loanLimitMax,
    setLoanLimitMax,
    initialInterestRateMin,
    setInitialInterestRateMin,
    initialInterestRateMax,
    setInitialInterestRateMax,
    previousLoanCountMin,
    setPreviousLoanCountMin,
    previousLoanCountMax,
    setPreviousLoanCountMax,
    loanType,
    setLoanType,
  } = loanFilterStore;

  // 필터 조회 전 입력값 보관용 임시 필터
  const [tempFilters, setTempFilters] = useState<LoanFilterType>({
    status,
    applicationDateRange,
    applicantName,
    loanLimitMin,
    loanLimitMax,
    initialInterestRateMin,
    initialInterestRateMax,
    previousLoanCountMin,
    previousLoanCountMax,
    loanType,
  });

  // 조회용 필터
  const filters: LoanFilterType = {
    status,
    applicationDateRange,
    applicantName,
    loanLimitMin,
    loanLimitMax,
    initialInterestRateMin,
    initialInterestRateMax,
    previousLoanCountMin,
    previousLoanCountMax,
    loanType,
  };

  /**
   * 핸들러 및 유틸 함수
   */
  // 임시 필터 변경 핸들러
  const handleTempFilterChange = <K extends keyof LoanFilterType>(
    key: K,
    value: LoanFilterType[K]
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 대출 상태 변경 핸들러
  const handleStatusChange = (
    newValue: string,
    dataIndex?: string,
    record?: LoanApplicationTableRow
  ) => {
    if (!record?.applicationId || !accessToken || dataIndex !== 'status') {
      console.error('상태 변경 실패: 필수 정보 누락', { record, accessToken, dataIndex });
      return;
    }

    // 상태 변경을 바로 실행하지 않고 모달을 표시하기 위해 정보 저장
    setPendingStatusChange({
      record,
      newStatus: newValue,
    });

    // 폼 초기화
    statusChangeForm.resetFields();

    // 모달 표시
    setIsModalVisible(true);
  };

  // 모달 취소 핸들러
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setPendingStatusChange(null);

    // 중요: 상태 변경이 취소되었으므로 테이블을 원래 상태로 되돌려야 함
    // 데이터를 다시 불러오거나 상태를 복원하는 로직 필요
    const params = filtersToLoanApplicationParams(filters, page, PAGE_SIZE);
    queryClient.invalidateQueries({
      queryKey: ['loanApplications', JSON.stringify(params), accessToken],
    });
  };

  // 모달 확인 핸들러
  const handleModalOk = () => {
    if (!pendingStatusChange) {
      setIsModalVisible(false);
      return;
    }

    statusChangeForm
      .validateFields()
      .then((values) => {
        const { reason } = values;
        const { record, newStatus } = pendingStatusChange;

        if (!record?.applicationId || !accessToken) {
          console.error('상태 변경 실패: 필수 정보 누락', { record, accessToken });
          return;
        }

        // 로딩 메시지 표시
        const messageKey = 'statusChangeLoading';
        message.loading({ content: '상태 변경 중...', key: messageKey, duration: 0 });

        // 상태 변경 요청 실행
        patchStatusMutation.mutate(
          {
            applicationId: record.applicationId,
            payload: {
              status: newStatus,
              reason: reason,
            },
            accessToken,
          },
          {
            onSuccess: () => {
              // 성공 메시지 표시
              message.success({ content: '상태가 성공적으로 변경되었습니다.', key: messageKey });
              // 모달 닫기
              setIsModalVisible(false);
              setPendingStatusChange(null);
            },
            onError: (error) => {
              console.error('상태 변경 실패:', error);
              // 에러 메시지 표시
              const messageKey = 'statusChangeLoading';
              let errorMessage = '알 수 없는 오류가 발생했습니다.';

              if (isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
              }

              message.error({
                content: `상태 변경 실패: ${errorMessage}`,
                key: messageKey,
              });

              // 오류 발생 시 데이터 다시 로드하여 UI 상태 복원
              const params = filtersToLoanApplicationParams(filters, page, PAGE_SIZE);
              queryClient.invalidateQueries({
                queryKey: ['loanApplications', JSON.stringify(params), accessToken],
              });
            },
          }
        );
      })
      .catch((info) => {
        console.error('폼 검증 실패:', info);
      });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // 날짜 범위 dayjs 객체 배열로 변환
  const toDayjsRange = (
    range?: [string, string]
  ): [dayjs.Dayjs | null, dayjs.Dayjs | null] | undefined => {
    if (range && range[0] && range[1]) {
      return [dayjs(range[0]), dayjs(range[1])];
    }
    return undefined;
  };

  // 필터 적용 및 조회 버튼 클릭 핸들러
  const handleSearchClick = () => {
    setStatus(tempFilters.status);
    setApplicationDateRange(tempFilters.applicationDateRange);
    setApplicantName(tempFilters.applicantName);
    setLoanLimitMin(tempFilters.loanLimitMin);
    setLoanLimitMax(tempFilters.loanLimitMax);
    setInitialInterestRateMin(tempFilters.initialInterestRateMin);
    setInitialInterestRateMax(tempFilters.initialInterestRateMax);
    setPreviousLoanCountMin(tempFilters.previousLoanCountMin);
    setPreviousLoanCountMax(tempFilters.previousLoanCountMax);
    setLoanType(tempFilters.loanType);
    setPage(1);
  };

  /**
   * 데이터 패치 및 인증
   */
  // 최초 렌더링 시 accessToken 확인 및 설정
  useEffect(() => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!accessToken) {
      router.replace('/admin/not-found');
    } else {
      setAccessToken(accessToken);
    }
  }, [router]);

  // 대출 신청 목록 조회, 상태 수정 훅
  const { data, isLoading } = useLoanApplicationsQuery(filters, accessToken || '', page, PAGE_SIZE);
  const patchStatusMutation = usePatchLoanStatus(filters, accessToken || '', page, PAGE_SIZE);

  // 테이블 데이터에 상태 변경 핸들러 추가
  const tableData = React.useMemo(() => {
    return (data?.loanApplications || []).map((application) => ({
      ...application,
      handleChange: handleStatusChange,
    }));
  }, [data?.loanApplications, handleStatusChange]);

  return (
    <PageContainer>
      <ContentColumn>
        <Conditionbar
          title="대출 신청 현황"
          totalElements={
            data?.paginationInfo.totalElements ? `${data.paginationInfo.totalElements}개` : '0개'
          }
        >
          <Space wrap size="middle">
            <FilterRow>
              <FilterLabel>상태</FilterLabel>
              <Select
                value={tempFilters.status}
                onChange={(e) => handleTempFilterChange('status', e)}
                options={[
                  { value: 'ALL', label: '전체' },
                  { value: 'PRE_APPLIED', label: '신청 접수' },
                  { value: 'PENDING', label: '심사중' },
                  { value: 'REJECTED', label: '거절됨' },
                  { value: 'EXECUTED', label: '실행됨' },
                  { value: 'COMPLETED', label: '상환 완료' },
                ]}
                style={{ width: 100 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>신청일</FilterLabel>
              <RangePicker
                format="YYYY-MM-DD"
                value={toDayjsRange(tempFilters.applicationDateRange || undefined)}
                onChange={(_, dateStrings) =>
                  handleTempFilterChange('applicationDateRange', dateStrings)
                }
                style={{ width: 240 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>신청자</FilterLabel>
              <Input
                placeholder="이름"
                value={tempFilters.applicantName}
                onChange={(e) => handleTempFilterChange('applicantName', e.target.value)}
                style={{ width: 130 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>대출 가능 한도</FilterLabel>
              <InputNumber
                min={0}
                max={5000000}
                step={100000}
                placeholder="0"
                value={tempFilters.loanLimitMin}
                onChange={(value) => handleTempFilterChange('loanLimitMin', value)}
                style={{ width: 120 }}
              />
              <p>~</p>
              <InputNumber
                min={0}
                max={5000000}
                step={100000}
                placeholder="5,000,000"
                value={tempFilters.loanLimitMax}
                onChange={(value) => handleTempFilterChange('loanLimitMax', value)}
                style={{ width: 120 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>초기 대출 금리</FilterLabel>
              <InputNumber
                min={3.0}
                max={12.0}
                step={0.1}
                precision={2}
                placeholder="3.0"
                value={tempFilters.initialInterestRateMin}
                onChange={(value) => handleTempFilterChange('initialInterestRateMin', value)}
                style={{ width: 80 }}
              />
              <p>~</p>
              <InputNumber
                min={3.0}
                max={12.0}
                step={0.1}
                precision={2}
                placeholder="12.0"
                value={tempFilters.initialInterestRateMax}
                onChange={(value) => handleTempFilterChange('initialInterestRateMax', value)}
                style={{ width: 80 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>기존 대출 횟수</FilterLabel>
              <InputNumber
                min={0}
                max={100}
                placeholder="0"
                value={tempFilters.previousLoanCountMin}
                onChange={(value) => handleTempFilterChange('previousLoanCountMin', value)}
                style={{ width: 65 }}
              />
              <p>~</p>
              <InputNumber
                min={0}
                max={100}
                placeholder="100"
                value={tempFilters.previousLoanCountMax}
                onChange={(value) => handleTempFilterChange('previousLoanCountMax', value)}
                style={{ width: 65 }}
              />
            </FilterRow>

            <FilterRow>
              <FilterLabel>신규/연장/재가입</FilterLabel>
              <Select
                value={tempFilters.loanType}
                onChange={(value) => handleTempFilterChange('loanType', value)}
                options={[
                  { value: 'ALL', label: '전체' },
                  { value: 'NEW', label: '신규' },
                  { value: 'EXTENSION', label: '연장' },
                  { value: 'REDEVELOPMENT', label: '재가입' },
                ]}
                style={{ width: 100 }}
              />
            </FilterRow>
          </Space>

          <Button type="primary" onClick={handleSearchClick}>
            조회
          </Button>
        </Conditionbar>

        <DataTable
          loading={isLoading}
          columnMetas={[...LOAN_APPLICATION_COLUMN_METAS]}
          linkPrefix="/admin/customer-management/"
          data={tableData}
          paginationInfo={{
            currentPage: page,
            pageSize: data?.paginationInfo.pageSize || PAGE_SIZE,
            totalElements: data?.paginationInfo.totalElements || 0,
            totalPages: data?.paginationInfo.totalPages || 0,
            onChange: handlePageChange,
          }}
        />

        {/* 상태 변경 확인 모달 */}
        <Modal
          title="대출 상태 변경"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="확인"
          cancelText="취소"
        >
          <Form form={statusChangeForm} layout="vertical">
            <Form.Item
              name="reason"
              label="변경 사유"
              rules={[{ required: true, message: '변경 사유를 입력해주세요' }]}
            >
              <Input.TextArea rows={4} placeholder="상태 변경 사유를 입력해주세요" />
            </Form.Item>
          </Form>
        </Modal>
      </ContentColumn>
    </PageContainer>
  );
};

export default AdminLoanApplicationPage;
