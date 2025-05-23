'use client';
import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { loginUser } from '@/apis/auth';
import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { authSchemas } from '@/schemas/auth.schema';

import { Container, Title } from '../LoginSelector/LoginSelector.style';

import { BtnContainer, FormContainer } from './LoginForm.style';
import { LoginFormValues, useLoginUser } from '@/hooks/useLoginUser';

const LoginForm = () => {
  const [emailEntered, setEmailEntered] = useState(false);
  const router = useRouter();

  const { mutate: login } = useLoginUser();

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(authSchemas.login),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const email = watch('email');

  useEffect(() => {
    const checkEmailValid = async () => {
      const valid = await trigger('email');
      if (valid) {
        setEmailEntered(true);
      }
    };

    if (!emailEntered && email) {
      checkEmailValid();
    }
  }, [email, emailEntered, trigger]);

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <Container>
      <Title>
        반가워요!
        <br />
        로그인을 진행할게요
      </Title>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {emailEntered && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
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
          <Button
            type="submit"
            text="로그인하기"
            disabled={emailEntered ? !isValid : !dirtyFields.email || !!errors.email}
          />
        </BtnContainer>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
