// 회원가입 비밀번호 설정 컴포넌트
// @author 윤영찬
// @since 2025-05-13

'use client'
import React, { useState } from 'react'
import {
  Container,
  Title,
  FormContainer,
  BtnContainer,
} from '../../../../components/signup/EmailForm/EmailForm.style' // 경로 맞게 수정

export const SignupPassword: React.FC<{ email: string; onNext: (pw: string) => void }> = ({ email, onNext }) => {
  const [password, setPassword] = useState('')

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) {
      alert('비밀번호를 입력해주세요.')
      return
    }
    onNext(password)
  }

  return (
    <Container>
      <Title>비밀번호 설정</Title>
      <FormContainer onSubmit={handleNext}>
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="w-full p-3 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={email}
          readOnly
          className="w-full p-3 border rounded mb-4 bg-gray-100"
        />
        <BtnContainer>
          <button
            type="submit"
            className="w-full p-4 bg-blue-500 text-white rounded"
          >
            다음으로
          </button>
        </BtnContainer>
      </FormContainer>
    </Container>
  )
}

export default SignupPassword
