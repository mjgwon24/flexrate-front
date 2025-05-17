'use client'
import React from 'react'
export const AnalysisResult: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="p-4 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-4">분석 결과</h2>
    <div className="w-full p-4 border rounded mb-4">분석 카드 영역</div>
    <button onClick={onNext} className="w-full p-4 bg-blue-500 text-white rounded">다음으로</button>
  </div>
)

export default AnalysisResult;