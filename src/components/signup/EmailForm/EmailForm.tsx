'use client';

import Button from '@/components/Button/Button';
import { BtnContainer, Container, FormContainer, Title } from './EmailForm.style';
import { authSchemas } from '@/schemas/auth.schema';
import { z } from 'zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@/components/TextField/TextField';
import { motion } from 'framer-motion';

type FormData = z.infer<typeof authSchemas.emailWithCode>;

export default function EmailForm({ onNext }: { onNext: (email: string) => void }) {
  const [codeSent, setCodeSent] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, dirtyFields, isValid },
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

    try {
      // API 호출: 인증메일 요청
      await fetch('/api/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      setCodeSent(true);
    } catch (error) {
      console.error(error);
      alert('인증메일 발송에 실패했습니다.');
    }
  };


  const handleVerify = async () => {
    const isCodeValid = await trigger('code');
    if (!isCodeValid) return;
    onNext(email);
  };

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
                  <TextField.TextFieldBox type="code" placeholder="인증번호 입력" />
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
}
