'use client';

import React from 'react';

import { useFunnel } from '@use-funnel/browser';

import Header from '@/components/Header/Header';
import { Wrapper } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import Agreement from '@/components/signup/AgreeForConsumptionType/AgreeForConsumptionType';
import ConsumptionGoal from '@/components/signup/ConsumptionGoal/ConsumptionGoal';
import ConsumptionResult from '@/components/signup/ConsumptionResult/ConsumptionResult';
import EmailForm from '@/components/signup/EmailForm/EmailForm';
import InfoForm from '@/components/signup/InfoForm/InfoForm';
import PasswordForm from '@/components/signup/PasswordForm/PasswordForm';
import { SignupSteps } from '@/types/funnel.type';

const SignupPage = (): React.JSX.Element => {
  const funnel = useFunnel<SignupSteps>({
    id: 'signup',
    initial: { step: '이메일인증', context: { email: '' } },
  });

  return (
    <Wrapper>
      <Header backIcon={funnel.step !== '이메일인증'} />
      <funnel.Render
        이메일인증={funnel.Render.with({
          render: () => (
            <EmailForm
              onNext={(email) =>
                funnel.history.push('비밀번호설정', (prev) => ({ ...prev, email }))
              }
            />
          ),
        })}
        비밀번호설정={funnel.Render.with({
          render: ({ context }) => (
            <PasswordForm
              email={context.email}
              onNext={({ password, method }) => {
                const nextStep =
                  method === '간편비밀번호' ? '간편비밀번호설정' : '내정보입력';
                funnel.history.push(nextStep, (prev) => ({
                  ...prev,
                  ...context,
                  password,
                  method,
                }));
              }}
            />
          ),
        })}
        간편비밀번호설정={funnel.Render.with({
          render: () => (
            <div>
              <h2>간편 비밀번호 설정</h2>
            </div>
          ),
        })}
        내정보입력={funnel.Render.with({
          render: ({ context }) => (
            <InfoForm
              defaultValues={{
                gender: context.gender as '남성' | '여성' | undefined,
                birthDate: context.birthDate
                  ? Number(context.birthDate)
                  : undefined,
                name: context.name,
              }}
              onNext={({ gender, birthDate, name }: { gender: string; birthDate: number; name: string }) =>
                funnel.history.push('소비성향체크', (prev) => ({
                  ...prev,
                  ...context,
                  gender,
                  birthDate,
                  name,
                }))
              }
            />
          ),
        })}
        소비성향체크={funnel.Render.with({
          render: () => (
            <Agreement
              onNext={() =>
                funnel.history.push('소비성향결과', (prev) => ({
                  ...prev,
                  agreement: true,
                }))
              }
            />
          ),
        })}
        소비성향결과={funnel.Render.with({
          render: () => (
            <ConsumptionResult
              onNext={() =>
                funnel.history.push('소비목적결과', (prev) => ({
                  ...prev,
                  consumptionGoal: '',
                }))
              }
            />
          ),
        })}
        소비목적결과={funnel.Render.with({
          render: ({ context }) => (
            <ConsumptionGoal
              onComplete={() => console.log('회원가입 완료', context)}
            />
          ),
        })}
      />
    </Wrapper>
  );
};

export default SignupPage;
