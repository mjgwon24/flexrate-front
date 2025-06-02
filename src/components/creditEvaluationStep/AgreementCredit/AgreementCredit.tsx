import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/Button/Button';
import CheckBox from '@/components/CheckBox/CheckBox';
import { Title } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import { BtnContainer } from '@/components/signup/EmailForm/EmailForm.style';
import { creditSchemas } from '@/schemas/credit.schema';

import {
  CheckBoxContainer,
  Container,
  SmallCheckBoxes,
  TitleContainer,
} from '../AgreementCredit.style';

type FormData = z.infer<typeof creditSchemas.creditAgreement>;

interface AgreementCreditProps {
  onNext: () => void;
}

const AgreementCredit = ({ onNext }: AgreementCreditProps) => {
  const {
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(creditSchemas.creditAgreement),
    mode: 'onChange',
    defaultValues: {
      agreePrivacy: false,
      agreeMyDataTerms: false,
      agreeThird: false,
      agreeCreditScoreGuide: false,
    },
  });

  const agreePrivacy = watch('agreePrivacy');
  const agreeThird = watch('agreeThird');
  const agreeMyDataTerms = watch('agreeMyDataTerms');
  const agreeCreditScoreGuide = watch('agreeCreditScoreGuide');
  const allChecked = agreePrivacy;

  const handleAllChange = (nextChecked: boolean) => {
    setValue('agreePrivacy', nextChecked, { shouldValidate: true });
    setValue('agreeThird', nextChecked, { shouldValidate: true });
    setValue('agreeMyDataTerms', nextChecked, { shouldValidate: true });
    setValue('agreeCreditScoreGuide', nextChecked, { shouldValidate: true });
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
            label="[필수] 개인(신용)정보 수집·이용·제공 동의서"
            showMoreText="더보기"
            showMoreUrl="https://ryuseunghan.notion.site/202c3966a1438047bbf4eedd02078ea1?source=copy_link"
            checked={agreePrivacy}
            onChange={(val) => setValue('agreePrivacy', val, { shouldValidate: true })}
          />

          <CheckBox
            size="small"
            label="[필수] 우리 마이데이터 서비스 이용약관"
            showMoreText="더보기"
            showMoreUrl="https://ryuseunghan.notion.site/204c3966a143806593d8cd4b482d0078?source=copy_link"
            checked={agreeMyDataTerms}
            onChange={(val) => setValue('agreeMyDataTerms', val, { shouldValidate: true })}
          />

          <CheckBox
            size="small"
            label="개인(신용) 정보 제3자 제공 동의서"
            showMoreText="더보기"
            showMoreUrl="https://ryuseunghan.notion.site/3-204c3966a143804ebc07f14d76aa1d4c?source=copy_link"
            checked={agreeThird}
            onChange={(val) => setValue('agreeThird', val, { shouldValidate: true })}
          />

          <CheckBox
            size="small"
            label="신용 평가 지표 설명서"
            showMoreText="더보기"
            showMoreUrl="https://ryuseunghan.notion.site/204c3966a14380a4bc5efa062d0150b6?source=copy_link"
            checked={agreeCreditScoreGuide}
            onChange={(val) => setValue('agreeCreditScoreGuide', val, { shouldValidate: true })}
          />
        </SmallCheckBoxes>

        <BtnContainer>
          <Button size="XL" text="동의하고 보기" disabled={!isValid} onClick={onNext} />
        </BtnContainer>
      </CheckBoxContainer>
    </Container>
  );
};

export default AgreementCredit;
