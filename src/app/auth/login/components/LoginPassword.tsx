// 로그인 - 비밀번호 입력 단계
// @author 윤영찬
// @since 2025.05.17

'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchemas } from '@/schemas/auth.schema'

type PasswordForm = { password: string }
export type LoginPasswordProps = {
  email: string
  onSubmit: (password: string) => void
}

export const LoginPassword: React.FC<LoginPasswordProps> = ({ email, onSubmit }) => {
  const { register, handleSubmit, formState } = useForm<PasswordForm>({
    resolver: zodResolver(authSchemas.password),
    mode: 'onChange',
  })

  const submitHandler = ({ password }: PasswordForm) => {
    onSubmit(password)
  }

  return (
    <form
      className="flex flex-col items-center gap-6 p-4 absolute inset-0 top-[200px]"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="w-full px-4 text-left text-2xl font-bold">
        반가워요!<br />로그인을 진행할게요
      </h2>

      <input
        type="password"
        placeholder="비밀번호 입력"
        {...register('password')}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        value={email}
        readOnly
        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
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
        로그인하기
      </button>
    </form>
  )
}
