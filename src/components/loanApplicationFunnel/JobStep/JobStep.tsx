import Accordion from '@/components/Accordion/Accordion';
import Button from '@/components/Button/Button';
import {
  EMPLOYMENT_TYPE,
  EMPLOYMENT_TYPE_MAP,
  EMPLOYMENT_TYPE_OPTIONS,
} from '@/constants/loan.constant';
import { reverseMap } from '@/utils/signup.util';

import { FunnelContextMap } from '../LoanApplicationFunnel';
import { Container } from '../LoanApplicationFunnel.style';

import { BtnContainer, JobInformationContainer, MainContainer, SubTitle } from './JobStep.style';

interface Props {
  value: FunnelContextMap['직업정보입력'];
  onChange: (ctx: FunnelContextMap['직업정보입력']) => void;
  onNext: () => void;
}

export const JobStep = ({ value, onChange, onNext }: Props) => {
  const selectedKorean = reverseMap(EMPLOYMENT_TYPE_MAP, value.employmentType);

  return (
    <Container>
      <MainContainer>
        <JobInformationContainer>
          <SubTitle>직업 정보</SubTitle>
          <Accordion
            options={EMPLOYMENT_TYPE_OPTIONS}
            title="고용 형태"
            value={selectedKorean}
            onSelect={(selected) =>
              onChange({
                ...value,
                employmentType: EMPLOYMENT_TYPE_MAP[selected as EMPLOYMENT_TYPE],
              })
            }
          />
        </JobInformationContainer>
      </MainContainer>
      <BtnContainer>
        <Button text="다음으로" onClick={onNext} disabled={!value.employmentType} />
      </BtnContainer>
    </Container>
  );
};
