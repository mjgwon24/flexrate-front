import { FunnelContextMap } from '../LoanApplicationFunnel';
import { BtnContainer, JobInformationContainer, MainContainer, SubTitle } from './JobStep.style';
import { EMPLOYMENT_TYPE_OPTIONS } from '@/constants/loan.constant';
import Accordion from '@/components/Accordion/Accordion';
import Button from '@/components/Button/Button';
import { Container } from '../LoanApplicationFunnel.style';

interface Props {
  value: FunnelContextMap['직업정보입력'];
  onChange: (ctx: FunnelContextMap['직업정보입력']) => void;
  onNext: () => void;
}

export const JobStep = ({ value, onChange, onNext }: Props) => {
  return (
    <Container>
      <MainContainer>
        <JobInformationContainer>
          <SubTitle>직업 정보</SubTitle>
          <Accordion
            options={EMPLOYMENT_TYPE_OPTIONS}
            title="고용 형태"
            value={value.employmentType}
            onSelect={(selected) => onChange({ ...value, employmentType: selected })}
          />
        </JobInformationContainer>
      </MainContainer>
      <BtnContainer>
        <Button text="다음으로" onClick={onNext} />
      </BtnContainer>
    </Container>
  );
};
