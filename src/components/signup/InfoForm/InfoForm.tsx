'use client';

import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { BtnContainer, Container, Title } from '../EmailForm/EmailForm.style';
import styled from '@emotion/styled';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { authSchemas } from '@/schemas/auth.schema';

type FormData = z.infer<typeof authSchemas.infoRegister>;

interface InfoFormProps {
  defaultValues?: Partial<FormData>;
  onNext: (data: FormData) => void;
}

export const InfoForm = ({ defaultValues, onNext }: InfoFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(authSchemas.infoRegister),
    mode: 'onChange',
    defaultValues: {
      gender: defaultValues?.gender ?? undefined,
      birthDate: defaultValues?.birthDate,
      name: defaultValues?.name,
    },
  });

  const gender = watch('gender');
  const birthDate = watch('birthDate');

  const currentStep: 'gender' | 'birthDate' | 'name' = !gender
    ? 'gender'
    : !birthDate || birthDate.toString().length !== 8
    ? 'birthDate'
    : 'name';

  const getTitle = () => {
    console.log(currentStep);
    switch (currentStep) {
      case 'gender':
        return '성별을 알려주세요';
      case 'birthDate':
        return '생년월일을 알려주세요';
      case 'name':
        return '이름을 알려주세요';
    }
  };

  return (
    <Container>
      <Title>{getTitle()}</Title>
      <Wrapper>
        {currentStep === 'name' && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  isError={!!errors.name}
                  rightContent={{ type: 'DELETE', onClick: () => field.onChange('') }}
                >
                  <TextField.TextFieldBox type="text" placeholder="이름 입력" />
                  <TextField.ErrorText message={errors.name?.message ?? ''} />
                </TextField>
              )}
            />
          </motion.div>
        )}

        {gender && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  isError={!!errors.birthDate}
                  rightContent={{ type: 'DELETE', onClick: () => field.onChange('') }}
                >
                  <TextField.TextFieldBox type="number" placeholder="생년월일 (예: 19990101)" />
                  <TextField.ErrorText message={errors.birthDate?.message ?? ''} />
                </TextField>
              )}
            />
          </motion.div>
        )}

        <FlexContainer>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <Button
                  size="M"
                  text="여성"
                  varient="TERTIARY"
                  selected={field.value === '여성'}
                  onClick={() => field.onChange('여성')}
                />
                <Button
                  size="M"
                  text="남성"
                  varient="TERTIARY"
                  selected={field.value === '남성'}
                  onClick={() => field.onChange('남성')}
                />
              </>
            )}
          />
        </FlexContainer>

        <BtnContainer>
          <Button
            type="submit"
            text="다음으로"
            disabled={!isValid}
            onClick={handleSubmit(onNext)}
          />
        </BtnContainer>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  padding: 0px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
