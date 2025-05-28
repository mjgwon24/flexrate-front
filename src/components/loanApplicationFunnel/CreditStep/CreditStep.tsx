'use client';

import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { RESIDENT_TYPE, RESIDENT_TYPE_MAP, RESIDENT_TYPE_OPTIONS } from '@/constants/loan.constant';
import { useUserStore } from '@/stores/userStore';
import { reverseMap } from '@/utils/signup.util';

import { FunnelContextMap } from '../LoanApplicationFunnel';
import { Container } from '../LoanApplicationFunnel.style';

import {
  BtnContainer,
  BtnFlexContainer,
  BtnSectionTitle,
  CreditInformationContainer,
  FlexContainer,
  MainContainer,
  SubTitle,
} from './CreditStep.style';

interface Props {
  value: FunnelContextMap['신용정보입력'];
  onChange: (ctx: FunnelContextMap['신용정보입력']) => void;
  onNext: () => void;
}

export const CreditStep = ({ value, onChange, onNext }: Props) => {
  const user = useUserStore((state) => state.user);
  const selectedResidence = reverseMap(RESIDENT_TYPE_MAP, value.residenceType);

  const handleCreditGradeSet = () => {
    if (user?.creditScore) {
      onChange({ ...value, creditGrade: user.creditScore.toString() });
    }
  };

  const isNextEnabled =
    value.annualIncome?.toString().trim() !== '' &&
    /^\d+$/.test(value.annualIncome.toString()) &&
    value.residenceType !== '' &&
    typeof value.isBankrupt === 'boolean';

  return (
    <Container>
      <MainContainer>
        <CreditInformationContainer>
          <SubTitle>신용 정보 입력</SubTitle>
        </CreditInformationContainer>

        <FlexContainer>
          <TextField
            value={value.annualIncome}
            onChange={(val) => {
              if (/^\d*$/.test(val)) {
                onChange({ ...value, annualIncome: Number(val) });
              }
            }}
          >
            <TextField.Label>연소득</TextField.Label>
            <TextField.TextFieldBox placeholder="숫자만 입력" />
          </TextField>

          <TextField
            value={user?.creditScore?.toString() ?? ''}
            isDisabled
            onChange={handleCreditGradeSet}
          >
            <TextField.Label>신용 점수</TextField.Label>
            <TextField.TextFieldBox type="number" />
          </TextField>
        </FlexContainer>

        <BtnFlexContainer>
          <BtnSectionTitle>주거 정보</BtnSectionTitle>
          <FlexContainer>
            {RESIDENT_TYPE_OPTIONS.map((option: RESIDENT_TYPE) => (
              <Button
                key={option}
                size="XS"
                text={option}
                varient="TERTIARY"
                selected={option === selectedResidence}
                onClick={() =>
                  onChange({ ...value, residenceType: RESIDENT_TYPE_MAP[option as RESIDENT_TYPE] })
                }
              />
            ))}
          </FlexContainer>
        </BtnFlexContainer>

        <BtnFlexContainer>
          <BtnSectionTitle>개인 회생자 여부</BtnSectionTitle>
          <FlexContainer>
            <Button
              size="M"
              text="예"
              varient="TERTIARY"
              selected={value.isBankrupt === true}
              onClick={() => onChange({ ...value, isBankrupt: true })}
            />
            <Button
              size="M"
              text="아니오"
              varient="TERTIARY"
              selected={value.isBankrupt === false}
              onClick={() => onChange({ ...value, isBankrupt: false })}
            />
          </FlexContainer>
        </BtnFlexContainer>
      </MainContainer>

      <BtnContainer>
        <Button text="다음으로" onClick={onNext} disabled={!isNextEnabled} />
      </BtnContainer>
    </Container>
  );
};
