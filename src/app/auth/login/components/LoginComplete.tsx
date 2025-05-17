// login/components/LoginCompleteStep.tsx
// 로그인 완료 단계 - 안내 메시지 or 리디렉션 처리 위치
// @author 윤영찬
// @since 2025.05.17
'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface LoginCompleteProps {
  email: string
}

export const LoginComplete: React.FC<LoginCompleteProps> = ({ email }) => {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/home') // or '/dashboard'
    }, 1500)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
      <h1 className="text-2xl font-semibold">로그인 완료</h1>
      <p className="mt-3 text-gray-700 text-base">
        {email} 계정으로 로그인했어요.
        <br /> 잠시 후 메인 페이지로 이동합니다.
      </p>
    </div>
  )
}
