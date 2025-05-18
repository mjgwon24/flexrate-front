// 회원가입 비밀번호 설정 컴포넌트
// @author 윤영찬
// @since 2025-05-13

'use client'
import React, { useState } from 'react'

export const SignupPassword: React.FC<{ email: string; onNext: (pw: string) => void }> = ({ email, onNext }) => {
  const [password, setPassword] = useState('')

  const handleNext = () => {
    if (!password) {
      alert('비밀번호를 입력해주세요.')
      return
    }
    onNext(password)
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">비밀번호 설정</h2>
      <input
        type="password"
        placeholder="비밀번호 입력"
        className="w-full p-3 border rounded mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="text" value={email} readOnly className="w-full p-3 border rounded mb-4 bg-gray-100" />
      <button onClick={handleNext} className="w-full p-4 bg-blue-500 text-white rounded">
        다음으로
      </button>
    </div>
  )
}

export default SignupPassword
