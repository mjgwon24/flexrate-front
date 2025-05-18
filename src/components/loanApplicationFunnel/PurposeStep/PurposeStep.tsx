import Accordion from '@/components/Accordion/Accordion';
import { FunnelContextMap } from '../LoanApplicationFunnel';
import { Container } from '../LoanApplicationFunnel.style';
import {
  BtnContainer,
  MainContainer,
  PurposeInformationContainer,
  SubTitle,
} from './PurposeStep.style';
import { PURPOSE_TYPE_OPTIONS } from '@/constants/loan.constant';
import Button from '@/components/Button/Button';

interface PurposeStepProps {
  value: FunnelContextMap['대출목적입력'];
  onChange: (ctx: FunnelContextMap['대출목적입력']) => void;
  onSubmit: () => void;
}

export const PurposeStep = ({ value, onChange, onSubmit }: PurposeStepProps) => {
  return (
    <Container>
      <MainContainer>
        <PurposeInformationContainer>
          <SubTitle>대출 목적</SubTitle>
          <Accordion
            options={PURPOSE_TYPE_OPTIONS}
            title="목적"
            value={value.loanPurpose}
            onSelect={(selected) => onChange({ ...value, loanPurpose: selected })}
          />
        </PurposeInformationContainer>
      </MainContainer>
      <BtnContainer>
        <Button text="다음으로" onClick={onSubmit} />
      </BtnContainer>
    </Container>
  );
};
