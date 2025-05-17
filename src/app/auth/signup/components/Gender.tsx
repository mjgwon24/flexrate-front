// -- components/Gender.tsx
'use client'
import React from 'react'
export const Gender: React.FC<{ onNext: (gender: string) => void }> = ({ onNext }) => (
  <div className="p-4 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-4">성별을 알려주세요</h2>
    <button onClick={() => onNext('female')} className="w-full p-3 bg-gray-200 rounded mb-2">여성</button>
    <button onClick={() => onNext('male')} className="w-full p-3 bg-gray-200 rounded">남성</button>
  </div>
)

export default Gender;