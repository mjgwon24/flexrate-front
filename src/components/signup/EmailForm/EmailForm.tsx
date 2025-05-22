'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { authSchemas } from '@/schemas/auth.schema';

import { BtnContainer, Container, FormContainer, Title } from './EmailForm.style';

type FormData = z.infer<typeof authSchemas.emailWithCode>;

// 백엔드 API 서버 주소 (포트 포함)
const BASE_URL = 'http://localhost:8080';

const EmailForm = ({ onNext }: { onNext: (email: string) => void }) => {
  const [codeSent, setCodeSent] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(authSchemas.emailWithCode),
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
    },
  });

  const email = watch('email');
  const code = watch('code');

  const handleRequestCode = async () => {
    const isEmailValid = await trigger('email');
    if (!isEmailValid) return;
    setCodeSent(true);
  };

  const handleVerify = async () => {
    const isCodeValid = await trigger('code');
    if (!isCodeValid) return;
    onNext(email);
  };

  // // 인증메일 요청 핸들러
  // const handleRequestCode = async () => {
  //   console.log('handleRequestCode called, email:', email);
  //   const isEmailValid = await trigger('email');
  //   if (!isEmailValid) {
  //     console.log('Email validation failed');
  //     return;
  //   }
  //   try {
  //   const res = await fetch('http://localhost:8080/api/auth/email', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email }),
  //     mode: 'cors', // 추가
  //   });
  //   console.log('Fetch response status:', res.status);
  //   if (!res.ok) throw new Error(`서버 응답 에러: ${res.status}`);
  //   setCodeSent(true);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error('Fetch error:', error.message);
  //     } else {
  //       console.error('Fetch error (non-Error):', error);
  //     }
  //     alert('인증메일 발송에 실패했습니다.');
  //   }
  // };

  // const handleVerify = async () => {
  //   const isCodeValid = await trigger('code');
  //   if (!isCodeValid) return;

  //   try {
  //     const response = await fetch('http://localhost:8080/api/auth/email/verification', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, code }),
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`인증번호 검증 실패: ${response.status} - ${errorText}`);
  //     }

  //     onNext(email);
  //   } catch (error) {
  //     console.error(error);
  //     alert('인증번호가 틀렸거나 만료되었습니다.');
  //   }
  // };

  return (
    <Container>
      <Title>
        반가워요!
        <br />
        이메일 인증을 시작할게요
      </Title>

      <FormContainer>
        {codeSent && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  isError={!!errors.code}
                  rightContent={{
                    type: 'DELETE',
                    onClick: () => field.onChange(''),
                  }}
                >
                  <TextField.TextFieldBox type="text" placeholder="인증번호 입력" />
                  <TextField.ErrorText message={errors.code?.message ?? ''} />
                </TextField>
              )}
            />
          </motion.div>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              isError={!!errors.email}
              rightContent={{
                type: 'DELETE',
                onClick: () => field.onChange(''),
              }}
            >
              <TextField.TextFieldBox type="email" placeholder="이메일 주소 입력" />
              <TextField.ErrorText message={errors.email?.message ?? ''} />
            </TextField>
          )}
        />

        <BtnContainer>
          {!codeSent ? (
            <Button
              type="button"
              text="인증요청하기"
              onClick={handleRequestCode}
              disabled={!dirtyFields.email || !!errors.email}
            />
          ) : (
            <Button
              type="button"
              text="인증하기"
              onClick={handleVerify}
              disabled={!code || !!errors.code}
            />
          )}
        </BtnContainer>
      </FormContainer>
    </Container>
  );
};

export default EmailForm;
