'use client';

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { BtnContainer, MainContainer, SubContainer, Wrapper } from "@/app/mypage/page.style";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import { FlexContainer } from "@/components/loanApplicationFunnel/CreditStep/CreditStep.style";
import { Container } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import TextField from "@/components/TextField/TextField";
import { useInitUser } from "@/hooks/useInitUser";
import { User, useUserStore } from "@/stores/userStore";

const EditPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      router.replace('/not-found');
    }
  }, [router]);

  useInitUser();
  const user: User | null = useUserStore((state) => state.user);
  // const setUser = useUserStore((state) => state.setUser); // 또는 updateEmail 등
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("pendingEmail") || user?.email || "";
    }
    return user?.email || "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pending = sessionStorage.getItem("pendingEmail");
      setEmail(pending || user?.email || "");
    } else {
      setEmail(user?.email || "");
    }
  }, [user?.email]);

  const handleBack = () => {router.back();};
  const handleEmailEdit = () => router.push('/mypage/edit-email');
  const handleSave = async () => {
    // 이메일 저장 API 호출

    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pendingEmail");
    }
    // 성공시 userStore 업데이트
    // const user = useUserStore.getState().user;
    // setUser(user ? { ...user, email } : { name: '', email });
    // router.push('/mypage');
  };

  const isSaveEnabled = email && user?.email !== undefined && email !== user.email;

  console.log(`email: ${email}, user.email: ${user?.email}`);

  return (
    <Wrapper>
      <Header type="내 정보 변경" backIcon={true} />

      <Container>
        <MainContainer>
          <SubContainer>
            <TextField
              value={''}
              onChange={() => {}}
              isDisabled={true}
            >
              <TextField.Label>이름</TextField.Label>
              <TextField.TextFieldBox placeholder={user?.name} />
            </TextField>
          </SubContainer>

          <SubContainer>
            <TextField
              value={email}
              onChange={setEmail}
              isDisabled={true}
              rightContent={{type: 'CHANGE', onClick: handleEmailEdit}}
            >
              <TextField.Label>이메일</TextField.Label>
              <TextField.TextFieldBox placeholder={user?.email} />
            </TextField>
          </SubContainer>
        </MainContainer>

        <BtnContainer>
          <FlexContainer>
            <Button
              size="XS"
              text="취소"
              varient="S_SPECIAL"
              onClick={handleBack}
            />
            <Button
              text="저장하기"
              varient="PRIMARY"
              onClick={handleSave}
              disabled={!isSaveEnabled}
            />
          </FlexContainer>
        </BtnContainer>
      </Container>
    </Wrapper>
  );
};

export default EditPage;