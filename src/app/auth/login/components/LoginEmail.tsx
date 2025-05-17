// src/app/auth/login/components/LoginEmail.tsx
// 로그인 - 이메일 입력 단계
// @author 윤영찬
// @since 2025.05.14

'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchemas } from '@/schemas/auth.schema'

type EmailForm = { email: string }
export type LoginEmailProps = {
  defaultEmail?: string
  onNext: (email: string) => void
}

export const LoginEmail: React.FC<LoginEmailProps> = ({ defaultEmail = '', onNext }) => {
  const { register, handleSubmit, formState } = useForm<EmailForm>({
    resolver: zodResolver(authSchemas.email),
    defaultValues: { email: defaultEmail },
    mode: 'onChange',
  })

  const onSubmit = ({ email }: EmailForm) => {
    onNext(email)
  }

  return (
    <form
      className="flex flex-col items-center gap-6 p-4 absolute inset-0 top-[200px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="w-full px-4 text-left text-2xl font-bold">
        반가워요!<br />로그인을 진행할게요
      </h2>

      <input
        type="email"
        placeholder="이메일 입력"
        {...register('email')}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className={
          formState.isValid
            ? 'w-full px-4 py-4 bg-blue-500 text-white rounded-lg'
            : 'w-full px-4 py-4 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed'
        }
        disabled={!formState.isValid}
      >
        다음
      </button>
    </form>
  )
}
