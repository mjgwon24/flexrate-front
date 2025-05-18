'use client';

import { useRouter } from "next/navigation";

import { BtnContainer, MainContainer, SubContainer, Wrapper } from "@/app/mypage/page.style";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import { FlexContainer } from "@/components/loanApplicationFunnel/CreditStep/CreditStep.style";
import { Container } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import TextField from "@/components/TextField/TextField";

const EditPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/mypage/edit');
  };

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
              <TextField.TextFieldBox placeholder="권민지" />
            </TextField>
          </SubContainer>

          <SubContainer>
            <TextField
              value={''}
              onChange={() => {}}
              rightContent={{type: 'CHANGE', onClick: handleClick}}
            >
              <TextField.Label>이메일</TextField.Label>
              <TextField.TextFieldBox placeholder="email@email.com" />
            </TextField>
          </SubContainer>
        </MainContainer>

        <BtnContainer>
          <FlexContainer>
            <Button
              size="XS"
              text="취소"
              varient="S_SPECIAL"
              onClick={handleClick}
            />
            <Button
              text="저장하기"
              varient="S_SPECIAL"
              onClick={handleClick}
              disabled={true}
            />
          </FlexContainer>
        </BtnContainer>
      </Container>
    </Wrapper>
  );
};

export default EditPage;