'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '@/components/TextField/TextField';
import Button from '@/components/Button/Button';
import { Container, FormContainer, BtnContainer } from './../EmailForm/EmailForm.style';
import { BottomSheetBtnContainer, Title } from './PasswordForm.style';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BtnWrapper,
  Question,
  SheetBtn,
} from '@/components/login/LoginSelector/LoginSelector.style';
import Image from 'next/image';
import BottomSheet from '@/components/BottomSheet/BottomSheet';

const schema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/[a-zA-Z]/, '영문자를 포함해야 합니다.')
      .regex(/[0-9]/, '숫자를 포함해야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

interface PasswordFormProps {
  email: string;
  onNext: (data: { password: string; method: string }) => void;
}

const PasswordForm = ({ email, onNext }: PasswordFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const tempPassword = useRef('');
  const password = watch('password');

  useEffect(() => {
    const check = async () => {
      const valid = await trigger('password');
      if (valid) setShowConfirm(true);
    };
    check();
  }, [password, trigger]);

  const onSubmit = (data: FormData) => {
    setShowSelector(true);
    tempPassword.current = data.password;
  };

  const handleSelectMethod = (method: '간편비밀번호' | '지문' | '일반') => {
    if (method === '간편비밀번호') {
      onNext({ password: tempPassword.current, method: '간편비밀번호' });
    } else if (method === '일반') {
      onNext({ password: tempPassword.current, method: '일반' });
    }
  };

  return (
    <Container>
      <Title>비밀번호를 입력해주세요</Title>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {showConfirm && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  isError={!!errors.confirmPassword}
                  rightContent={{
                    type: 'DELETE',
                    onClick: () => field.onChange(''),
                  }}
                >
                  <TextField.TextFieldBox type="password" placeholder="비밀번호 확인" />
                  <TextField.ErrorText message={errors.confirmPassword?.message ?? ''} />
                </TextField>
              )}
            />
          </motion.div>
        )}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              isError={!!errors.password}
              rightContent={{
                type: 'DELETE',
                onClick: () => field.onChange(''),
              }}
            >
              <TextField.TextFieldBox type="password" placeholder="비밀번호 입력" />
              <TextField.ErrorText message={errors.password?.message ?? ''} />
            </TextField>
          )}
        />

        <BtnContainer>
          <Button type="submit" text="다음으로" disabled={!isValid} onClick={() => onSubmit} />
        </BtnContainer>
      </FormContainer>

      {showSelector && (
        <>
          <BottomSheet isOpen={true}>
            <Question>어떤 방법으로 로그인할까요?</Question>
            <BtnWrapper>
              <SheetBtn onClick={() => handleSelectMethod('간편비밀번호')}>
                <BottomSheetBtnContainer>
                  <Image src={'/imgs/lock.svg'} width={36} height={36} alt="간편 비밀번호" />
                  간편 비밀번호
                </BottomSheetBtnContainer>
              </SheetBtn>

              <SheetBtn onClick={() => handleSelectMethod('지문')}>
                <BottomSheetBtnContainer>
                  <Image src={'/imgs/faceId.svg'} width={36} height={36} alt="FaceID" />
                  지문
                </BottomSheetBtnContainer>
              </SheetBtn>

              <SheetBtn onClick={() => handleSelectMethod('일반')}>
                <BottomSheetBtnContainer>
                  <Image src={'/imgs/pattern.svg'} width={36} height={36} alt="패턴" />
                  일반 로그인
                </BottomSheetBtnContainer>
              </SheetBtn>
            </BtnWrapper>
          </BottomSheet>
        </>
      )}
    </Container>
  );
};

export default PasswordForm;
