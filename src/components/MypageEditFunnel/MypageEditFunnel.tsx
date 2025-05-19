'use client';

import { useFunnel } from '@use-funnel/browser';

import { Container } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';

import { CodeVerificationStep } from './CodeVerificationStep/CodeVerificationStep';
import { CompleteStep } from './CompleteStep/CompleteStep';
import { EmailStep } from './EmailStep/EmailStep';
import { Wrapper } from "./MypageEditFunnel.style";


export type MypageEditFunnelContextMap = {
  이메일입력: { email: string };
  인증코드입력: { email: string; code: string };
  완료: {};
};

const MypageEditFunnel = () => {
  const funnel = useFunnel<MypageEditFunnelContextMap>({
    id: 'mypage-edit-email-funnel',
    initial: {
      step: '이메일입력',
      context: { email: '' },
    },
  });

  return (
    <Wrapper>
      <Container>
        <funnel.Render
          이메일입력={funnel.Render.with({
            render: ({ context }) => (
              <EmailStep
                value={context}
                onChange={(ctx) => funnel.history.replace('이메일입력', ctx)}
                onNext={(email) =>
                  funnel.history.push('인증코드입력', { email, code: '' })
                }
              />
            ),
          })}
          인증코드입력={funnel.Render.with({
            render: ({ context }) => (
              <CodeVerificationStep
                value={context}
                onChange={(ctx) => funnel.history.replace('인증코드입력', ctx)}
                onNext={() => funnel.history.push('완료', {})}
              />
            ),
          })}
          완료={funnel.Render.with({
            render: () => <CompleteStep />,
          })}
        />
      </Container>
    </Wrapper>
  );
}

export default MypageEditFunnel;
