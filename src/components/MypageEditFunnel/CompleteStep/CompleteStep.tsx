import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Wrapper } from "@/app/mypage/page.style";
import { Title } from "@/components/loanApplicationFunnel/LoanApplicationFunnel.style";
import { useUserStore, User } from "@/stores/userStore";

interface Props {
  email: string;
}

export const CompleteStep = ({ email }: Props) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser); // 또는 updateEmail 등

  console.log(`email: ${email}`);

  useEffect(() => {
    sessionStorage.setItem("pendingEmail", email);
    
    // 이메일을 전역 userStore에 반영
    // setUser((prev: User) => ({ ...prev, email }));

    const timer = setTimeout(() => {
      router.replace("/mypage/edit");
    }, 1000); // 1초 후 이동

    return () => clearTimeout(timer);
  }, [email, setUser, router]);

  return (
    <Wrapper>
      <Title>이메일 인증이 완료되었습니다!</Title>
      <p>잠시 후 내 정보 변경 페이지로 이동합니다.</p>
    </Wrapper>
  );
};
