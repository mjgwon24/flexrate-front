'use client'
import React from 'react'

export const Agreement: React.FC<{ onAgree: () => void }> = ({ onAgree }) => (
  <div className="p-4 flex flex-col items-start">
    <h2 className="text-2xl font-bold mb-4">소비 성향을 분석해볼게요</h2>
    <label className="flex items-center mb-2">
      <input type="checkbox" className="mr-2" /> 전체 동의하기
    </label>
    <label className="flex items-center mb-2">
      <input type="checkbox" className="mr-2" /> 개인 정보 제공 동의
    </label>
    <label className="flex items-center mb-2">
      <input type="checkbox" className="mr-2" /> 서비스 이용 약관 동의
    </label>
    <button onClick={onAgree} className="mt-4 w-full p-4 bg-blue-500 text-white rounded">다음으로</button>
  </div>
)

export default Agreement;