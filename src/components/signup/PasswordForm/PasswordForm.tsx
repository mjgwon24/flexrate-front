'use client';

import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Button from '@/components/Button/Button';
import {
  BtnWrapper,
  Question,
  SheetBtn,
} from '@/components/login/LoginSelector/LoginSelector.style';
import TextField from '@/components/TextField/TextField';

import { Container, FormContainer, BtnContainer } from './../EmailForm/EmailForm.style';
import { BottomSheetBtnContainer, Title } from './PasswordForm.style';

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
      else setShowConfirm(false);
    };
    check();
  }, [password, trigger]);

  const onSubmit = (data: FormData) => {
    tempPassword.current = data.password;
    setShowSelector(true);
  };

  const handleSelectMethod = (method: '간편비밀번호' | '지문' | '일반') => {
    // 지문은 아직 구현 안 됐으면 무시 가능
    if (method === '간편비밀번호' || method === '일반') {
      onNext({ password: tempPassword.current, method });
    } else {
      // 지문 인증 등은 추후 처리
      alert('지문 인증은 아직 지원하지 않습니다.');
    }
  };

  return (
    <Container>
      <Title>비밀번호를 입력해주세요</Title>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
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

        <BtnContainer>
          <Button type="submit" text="다음으로" disabled={!isValid} />
        </BtnContainer>
      </FormContainer>

      {showSelector && (
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
                <Image src={'/icons/finger_36.svg'} width={36} height={36} alt="지문 인증" />
                지문 인증
              </BottomSheetBtnContainer>
            </SheetBtn>

            <SheetBtn onClick={() => handleSelectMethod('일반')}>
              <BottomSheetBtnContainer>
                <Image src={'/icons/webee_36.svg'} width={36} height={36} alt="일반 로그인" />
                일반 로그인
              </BottomSheetBtnContainer>
            </SheetBtn>
          </BtnWrapper>
        </BottomSheet>
      )}
    </Container>
  );
};

export default PasswordForm;
