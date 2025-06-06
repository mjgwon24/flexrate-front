'use client';

import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { authSchemas } from '@/schemas/auth.schema';
import { formatBirthDateIfPossible } from '@/utils/signup.util';

import { BtnContainer, Container, Title } from '../EmailForm/EmailForm.style';

type FormData = z.infer<typeof authSchemas.infoRegister>;

interface InfoFormProps {
  onNext: (data: FormData) => void;
}

export const InfoForm = ({ onNext }: InfoFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(authSchemas.infoRegister),
    mode: 'onChange',
    defaultValues: {
      name: '',
      sex: undefined,
      birthDate: '',
    },
  });

  const sex = watch('sex');
  const birthDate = watch('birthDate');

  const currentStep: 'sex' | 'birthDate' | 'name' = !sex
    ? 'sex'
    : !birthDate || birthDate.toString().length !== 10
    ? 'birthDate'
    : 'name';

  const getTitle = () => {
    switch (currentStep) {
      case 'sex':
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

        {sex && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => {
                const raw = field.value.replace(/\D/g, '');
                const formatted = raw.length === 8 ? formatBirthDateIfPossible(raw) : raw;

                return (
                  <TextField
                    value={formatted}
                    onChange={(input) => {
                      const raw = input.replace(/\D/g, '').slice(0, 8);

                      if (raw.length === 8) {
                        const formatted = formatBirthDateIfPossible(raw);
                        field.onChange(formatted);
                      } else {
                        field.onChange(raw);
                      }
                    }}
                    isError={!!errors.birthDate}
                    rightContent={{
                      type: 'DELETE',
                      onClick: () => field.onChange(''),
                    }}
                  >
                    <TextField.TextFieldBox type="text" placeholder="생년월일 (예: 19990101)" />
                    <TextField.ErrorText message={errors.birthDate?.message ?? ''} />
                  </TextField>
                );
              }}
            />
          </motion.div>
        )}

        <FlexContainer>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <>
                <Button
                  size="M"
                  text="여성"
                  varient="TERTIARY"
                  selected={field.value === 'FEMALE'}
                  onClick={() => field.onChange('FEMALE')}
                />
                <Button
                  size="M"
                  text="남성"
                  varient="TERTIARY"
                  selected={field.value === 'MALE'}
                  onClick={() => field.onChange('MALE')}
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
