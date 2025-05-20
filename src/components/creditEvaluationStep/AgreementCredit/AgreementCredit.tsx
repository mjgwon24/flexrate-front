import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/Button/Button';
import CheckBox from '@/components/CheckBox/CheckBox';
import { Title } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import { BtnContainer } from '@/components/signup/EmailForm/EmailForm.style';
import { authSchemas } from '@/schemas/auth.schema';

import {
  CheckBoxContainer,
  Container,
  SmallCheckBoxes,
  TitleContainer,
} from '../AgreementCredit.style';

type FormData = z.infer<typeof authSchemas.creditAgreeement>;

interface AgreementCreditProps {
  onNext: () => void;
}

const AgreementCredit = ({ onNext }: AgreementCreditProps) => {
  const {
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(authSchemas.agreement),
    mode: 'onChange',
    defaultValues: {
      agreePrivacy: false,
      agreeService: false,
    },
  });

  const agreePrivacy = watch('agreePrivacy');
  const agreeService = watch('agreeService');
  const allChecked = agreePrivacy && agreeService;

  const handleAllChange = (nextChecked: boolean) => {
    setValue('agreePrivacy', nextChecked, { shouldValidate: true });
    setValue('agreeService', nextChecked, { shouldValidate: true });
  };
  return (
    <Container>
      <TitleContainer>
        <Title>
          신용 점수를 평가하려면
          <br />
          약관 동의가 필요해요
        </Title>
      </TitleContainer>
      <CheckBoxContainer>
        <CheckBox
          size="large"
          checked={allChecked}
          label="전체 동의하기"
          onChange={handleAllChange}
        />

        <SmallCheckBoxes>
          <CheckBox
            size="small"
            label="개인 정보 제공 동의"
            showMoreText="더보기"
            checked={agreePrivacy}
            onChange={(val) => setValue('agreePrivacy', val, { shouldValidate: true })}
          />

          <CheckBox
            size="small"
            label="서비스 이용 약관 동의"
            showMoreText="더보기"
            checked={agreeService}
            onChange={(val) => setValue('agreeService', val, { shouldValidate: true })}
          />
        </SmallCheckBoxes>

        <BtnContainer>
          <Button
            type="submit"
            size="XL"
            text="동의하고 보기"
            disabled={!isValid}
            onClick={onNext}
          />
        </BtnContainer>
      </CheckBoxContainer>
    </Container>
  );
};

export default AgreementCredit;
