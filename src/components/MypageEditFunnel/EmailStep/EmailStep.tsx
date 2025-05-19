import { useState } from "react";

import { BtnContainer } from "@/app/mypage/page.style";
import Button from "@/components/Button/Button";
import { Title, MainContainer } from "@/components/MypageEditFunnel/MypageEditFunnel.style";
import TextField from "@/components/TextField/TextField";

interface Props {
  value: { email: string };
  onChange: (ctx: { email: string }) => void;
  onNext: (email: string) => void;
}

export const EmailStep = ({ value, onChange, onNext }: Props) => {
  const [email, setEmail] = useState(value.email);
  const [error, setError] = useState<{ email?: string }>({});
  const handleNext = () => onNext(value.email);

  return (
    <>
      <MainContainer>
        <Title>새로운 이메일을 입력해주세요</Title>
        <TextField
          label="이메일"
          value={email}
          onChange={setEmail}
          isError={!!error.email}
          helperText="이메일 형식이 올바르지 않아요"
          rightIconType="DELETE"
          onRightIconClick={() => setEmail('')}
        />
      </MainContainer>

      <BtnContainer>
        <Button text="인증 요청하기" onClick={handleNext} disabled={!value.email} />
      </BtnContainer>
    </>
  );
};
