// -- components/SignupMethodSelector.tsx
'use client'
import React from 'react'
export const SignupMethodSelector: React.FC<{ onSelect: (method: string) => void }> = ({ onSelect }) => (
  <div className="p-4 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-4">인증 방법 선택</h2>
    <button onClick={() => onSelect('passkey')} className="w-full p-3 bg-gray-200 rounded mb-2">Passkey</button>
    <button onClick={() => onSelect('faceid')} className="w-full p-3 bg-gray-200 rounded mb-2">FACE ID</button>
    <button onClick={() => onSelect('pin')} className="w-full p-3 bg-gray-200 rounded">간편 비밀번호</button>
  </div>
)