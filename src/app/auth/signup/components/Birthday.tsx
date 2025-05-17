// -- components/Birthday.tsx
'use client'
import React from 'react'
export const Birthday: React.FC<{ onNext: (birthday: string) => void }> = ({ onNext }) => (
  <div className="p-4 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-4">생년월일을 알려주세요</h2>
    <input type="date" className="w-full p-3 border rounded mb-4" />
    <button onClick={() => onNext('2001-08-24')} className="w-full p-4 bg-blue-500 text-white rounded">다음으로</button>
  </div>
)

export default Birthday;