// src/app/auth/login/components/LoginSelector.tsx
// 로그인 시작 단계 - 로그인 방식 선택 (BottomSheet 역할)
// @author 윤영찬
// @since 2025.05.13

'use client'
import React from 'react'

export type LoginSelectorProps = {
  onSelectPassword: () => void
  onSelectEmail: () => void
  onSelectFace: () => void
}

export const LoginSelector: React.FC<LoginSelectorProps> = ({
  onSelectEmail,
  onSelectFace,
  onSelectPassword,
}) => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-[15px] shadow-lg p-4 flex flex-col items-center gap-4">
      {/* Handle */}
      <div className="w-12 h-1 bg-gray-300 rounded-full mb-2" />

      <h3 className="w-full px-4 text-left text-lg font-semibold">
        어떤 방법으로 로그인할까요?
      </h3>

      <button
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg"
        onClick={onSelectEmail}
      >
        간편 비밀번호
      </button>

      <button
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg"
        onClick={onSelectFace}
      >
        FACE ID
      </button>

      <button
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg"
        onClick={onSelectPassword}
      >
        패턴
      </button>
    </div>
  )
}
