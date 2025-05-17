import Button from '@/components/Button/Button';
import { FunnelContextMap } from '../LoanApplicationFunnel';
import {
  BtnContainer,
  BtnFlexContainer,
  BtnSectionTitle,
  CreditInformationContainer,
  FlexContainer,
  MainContainer,
  SubTitle,
} from './CreditStep.style';
import { Container } from '../LoanApplicationFunnel.style';
import TextField from '@/components/TextField/TextField';
import { RESIDENT_TYPE, RESIDENT_TYPE_OPTIONS } from '@/constants/loan.constant';
import { useState } from 'react';

interface Props {
  value: FunnelContextMap['신용정보입력'];
  onChange: (ctx: FunnelContextMap['신용정보입력']) => void;
  onNext: () => void;
}

export const CreditStep = ({ value, onChange, onNext }: Props) => {
  const btns = RESIDENT_TYPE_OPTIONS;

  return (
    <Container>
      <MainContainer>
        <CreditInformationContainer>
          <SubTitle>신용 정보 입력</SubTitle>
        </CreditInformationContainer>
        <FlexContainer>
          <TextField
            value={value.annualIncome}
            onChange={(updatedValue) => onChange({ ...value, annualIncome: updatedValue })}
          >
            <TextField.Label>신용 점수</TextField.Label>
            <TextField.TextFieldBox />
          </TextField>
          <TextField
            value={value.creditGrade}
            onChange={(updatedValue) => onChange({ ...value, creditGrade: updatedValue })}
          >
            <TextField.Label>연소득</TextField.Label>
            <TextField.TextFieldBox />
          </TextField>
        </FlexContainer>
        <BtnFlexContainer>
          <BtnSectionTitle>주거 정보</BtnSectionTitle>
          <FlexContainer>
            {btns.map((select) => (
              <Button
                size="XS"
                text={select}
                varient="TERTIARY"
                selected={select === value.residenceType}
                onClick={() => onChange({ ...value, residenceType: select })}
              />
            ))}
          </FlexContainer>
        </BtnFlexContainer>
        <BtnFlexContainer>
          <BtnSectionTitle>개인 회생자 여부</BtnSectionTitle>
          <FlexContainer>
            <>
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
            </>
          </FlexContainer>
        </BtnFlexContainer>
      </MainContainer>
      <BtnContainer>
        <Button text="다음으로" onClick={onNext} />
      </BtnContainer>
    </Container>
  );
};
