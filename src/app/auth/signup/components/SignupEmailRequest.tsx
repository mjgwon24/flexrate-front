// 이메일 주소 입력 인증 요청을 시작하는 컴포넌트
// @author 윤영찬
// @since 2025-05-13


import React, { useState } from 'react';

export const SignupEmailRequest: React.FC<{ onNext: (email: string) => void }> = ({ onNext }) => {
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (email.trim()) {
      onNext(email);
    } else {
      alert('이메일을 입력해주세요.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-6">이메일로 인증 요청하기</h2>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border mb-4" 
        placeholder="이메일 주소 입력" 
      />
      <button onClick={handleNext} className="w-full p-3 bg-blue-500 text-white rounded">
        인증 요청하기
      </button>
    </div>
  );
};

export default SignupEmailRequest;
