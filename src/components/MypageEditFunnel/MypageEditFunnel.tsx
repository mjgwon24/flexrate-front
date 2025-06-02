'use client';

import { useFunnel } from '@use-funnel/browser';

import { Container } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';

import { CompleteStep } from './CompleteStep/CompleteStep';
import { EmailStep } from './EmailStep/EmailStep';
import { Wrapper } from './MypageEditFunnel.style';

export type MypageEditFunnelContextMap = {
  이메일인증: { email: string; code: string };
  이메일변경완료: { email: string };
};

const MypageEditFunnel = () => {
  const funnel = useFunnel<MypageEditFunnelContextMap>({
    id: 'mypage-edit-email-funnel',
    initial: {
      step: '이메일인증',
      context: { email: '', code: '' },
    },
  });

  return (
    <Wrapper>
      <Container>
        <funnel.Render
          이메일인증={funnel.Render.with({
            render: ({ context }) => (
              <EmailStep
                value={context}
                onChange={(ctx) => funnel.history.replace('이메일인증', ctx)}
                onNext={() => funnel.history.push('이메일변경완료', {})}
              />
            ),
          })}
          이메일변경완료={funnel.Render.with({
            render: ({ context }) => <CompleteStep email={context.email} />,
          })}
        />
      </Container>
    </Wrapper>
  );
};

export default MypageEditFunnel;
