'use client'
import React from 'react'
export const SignupEmailVerify: React.FC<{ defaultEmail: string; onVerify: () => void }> = ({ defaultEmail, onVerify }) => (
  <div className="p-4 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-4">인증번호 입력</h2>
    <input type="text" defaultValue={defaultEmail} readOnly className="w-full p-3 border rounded mb-2 bg-gray-100" />
    <input type="text" placeholder="인증번호 입력" className="w-full p-3 border rounded mb-4" />
    <button onClick={onVerify} className="w-full p-4 bg-blue-500 text-white rounded">인증하기</button>
  </div>
)