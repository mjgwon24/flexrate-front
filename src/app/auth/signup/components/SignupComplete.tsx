'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export const SignupComplete: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    const t = setTimeout(() => router.push('/home'), 1500)
    return () => clearTimeout(t)
  }, [router])
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <h1 className="text-2xl font-semibold">회원가입 완료</h1>
      <p className="mt-3 text-gray-700">회원가입이 완료되었습니다.<br/>메인 페이지로 이동합니다.</p>
    </div>
  )
}

export default SignupComplete;