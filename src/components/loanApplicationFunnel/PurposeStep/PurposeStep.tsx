import Accordion from '@/components/Accordion/Accordion';
import Button from '@/components/Button/Button';
import { PURPOSE_TYPE, PURPOSE_TYPE_MAP, PURPOSE_TYPE_OPTIONS } from '@/constants/loan.constant';
import { reverseMap } from '@/utils/signup.util';

import { FunnelContextMap } from '../LoanApplicationFunnel';
import { Container } from '../LoanApplicationFunnel.style';

import {
  BtnContainer,
  MainContainer,
  PurposeInformationContainer,
  SubTitle,
} from './PurposeStep.style';

interface PurposeStepProps {
  value: FunnelContextMap['대출목적입력'];
  onChange: (ctx: FunnelContextMap['대출목적입력']) => void;
  onSubmit: () => void;
}

export const PurposeStep = ({ value, onChange, onSubmit }: PurposeStepProps) => {
  const selectedKorean = reverseMap(PURPOSE_TYPE_MAP, value.loanPurpose);

  return (
    <Container>
      <MainContainer>
        <PurposeInformationContainer>
          <SubTitle>대출 목적</SubTitle>
          <Accordion
            options={PURPOSE_TYPE_OPTIONS}
            title="목적"
            value={selectedKorean}
            onSelect={(selected) =>
              onChange({ ...value, loanPurpose: PURPOSE_TYPE_MAP[selected as PURPOSE_TYPE] })
            }
          />
        </PurposeInformationContainer>
      </MainContainer>
      <BtnContainer>
        <Button text="다음으로" onClick={onSubmit} disabled={!value.loanPurpose} />
      </BtnContainer>
    </Container>
  );
};
