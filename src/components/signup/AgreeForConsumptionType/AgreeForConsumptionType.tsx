'use client';

import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/Button/Button';
import CheckBox from '@/components/CheckBox/CheckBox';
import { authSchemas } from '@/schemas/auth.schema';

import { BtnContainer, Container, Title } from '../EmailForm/EmailForm.style';

type FormData = z.infer<typeof authSchemas.agreement>;

interface AgreementProps {
  onNext: () => void;
}

const Agreement = ({ onNext }: AgreementProps) => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
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

  const onSubmit = (data: FormData) => {
    console.log('제출된 동의 정보:', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Title>소비 성향을 분석해볼게요</Title>
        <Wrapper>
          <CheckBox
            size="large"
            checked={allChecked}
            label="전체 동의하기"
            onChange={handleAllChange}
          />

          <CheckBoxContainer>
            <CheckBox
              size="small"
              label="개인 정보 제공 동의"
              showMoreText="더보기"
              checked={agreePrivacy}
              onChange={(val) => setValue('agreePrivacy', val, { shouldValidate: true })}
            />

            {errors.agreePrivacy && (
              <ErrorMessage>{errors.agreePrivacy.message}</ErrorMessage>
            )}


            <CheckBox
              size="small"
              label="서비스 이용 약관 동의"
              showMoreText="더보기"
              checked={agreeService}
              onChange={(val) => setValue('agreeService', val, { shouldValidate: true })}
            />
          </CheckBoxContainer>

          <BtnContainer>
            <Button type="submit" size="XL" text="다음으로" disabled={!isValid} />
          </BtnContainer>
        </Wrapper>
      </Container>
    </form>
  );
};

export default Agreement;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 22px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
  padding-top: 16px;
  gap: 22px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 8px;
`;