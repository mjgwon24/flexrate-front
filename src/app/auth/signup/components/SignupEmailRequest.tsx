// src/app/auth/signup/components/SignupEmailRequest.tsx
export const SignupEmailRequest = () => (
  <div className="p-4">
    <h2 className="text-2xl mb-6">이메일로 인증 요청하기</h2>
    <input className="w-full p-3 border mb-4" placeholder="이메일 주소 입력" />
    <button className="w-full p-3 bg-blue-500 text-white rounded">인증 요청하기</button>
  </div>
)