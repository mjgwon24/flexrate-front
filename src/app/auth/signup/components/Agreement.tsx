// 소비 성향 분석 개인 정보 및 서비스 약관 모두 동의해야 다음 단계로 진행
// @author 윤영찬
// @since 2025-05-13

'use client';
import React, { useState } from 'react';

export const Agreement: React.FC<{ onAgree: () => void }> = ({ onAgree }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
  });

  const handleAllChecked = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setAgreements({
      privacy: newState,
      terms: newState,
    });
  };

  const handleIndividualCheck = (key: 'privacy' | 'terms') => {
    const newState = { ...agreements, [key]: !agreements[key] };
    setAgreements(newState);
    setAllChecked(Object.values(newState).every(Boolean));
  };

  const handleAgree = () => {
    if (agreements.privacy && agreements.terms) {
      onAgree();
    } else {
      alert('모든 약관에 동의해주세요.');
    }
  };

  return (
    <div className="p-4 flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-4">소비 성향을 분석해볼게요</h2>
      <label className="flex items-center mb-2">
        <input type="checkbox" checked={allChecked} onChange={handleAllChecked} className="mr-2" />
        전체 동의하기
      </label>
      <label className="flex items-center mb-2">
        <input type="checkbox" checked={agreements.privacy} onChange={() => handleIndividualCheck('privacy')} className="mr-2" />
        개인 정보 제공 동의
      </label>
      <label className="flex items-center mb-2">
        <input type="checkbox" checked={agreements.terms} onChange={() => handleIndividualCheck('terms')} className="mr-2" />
        서비스 이용 약관 동의
      </label>
      <button onClick={handleAgree} className="mt-4 w-full p-4 bg-blue-500 text-white rounded">
        다음으로
      </button>
    </div>
  );
};

export default Agreement;
