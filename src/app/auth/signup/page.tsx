'use client';
import React from 'react';
import { useFunnel } from '@use-funnel/browser';
import { Wrapper } from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import Header from '@/components/Header/Header';
import EmailForm from '@/components/signup/EmailForm/EmailForm';
import PasswordForm from '@/components/signup/PasswordForm/PasswordForm';
import { InfoForm } from '@/components/signup/InfoForm/InfoForm';
import { SignupSteps } from '@/types/funnel.type';
import Agreement from '@/components/signup/AgreeForConsumptionType/AgreeForConsumptionType';
import ConsumptionResult from '@/components/signup/ConsumptionResult/ConsumptionResult';
import ConsumptionGoal from '@/components/signup/ConsumptionGoal/ConsumptionGoal';

export default function SignupPage() {
  const funnel = useFunnel<SignupSteps>({
    id: 'signup',
    initial: { step: '이메일인증', context: { email: '' } },
  });

  return (
    <Wrapper>
      <Header backIcon={funnel.step !== '이메일인증'} />
      <funnel.Render
        이메일인증={funnel.Render.with({
          render: ({ context }) => (
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
                if (method === '간편비밀번호') {
                  funnel.history.push('간편비밀번호설정', (prev) => ({
                    ...prev,
                    ...context,
                    password,
                    method,
                  }));
                } else {
                  funnel.history.push('내정보입력', (prev) => ({
                    ...prev,
                    ...context,
                    password,
                    method,
                  }));
                }
              }}
            />
          ),
        })}
        간편비밀번호설정={funnel.Render.with({
          render: ({ context }) => (
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
                birthDate: context.birthDate ? Number(context.birthDate) : undefined,
                name: context.name,
              }}
              onNext={({ gender, birthDate, name }) =>
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
          render: ({ context }) => (
            <Agreement
              onNext={() =>
                funnel.history.push('소비성향결과', (prev) => ({
                  ...prev,
                  ...context,
                  agreement: true,
                }))
              }
            />
          ),
        })}
        소비성향결과={funnel.Render.with({
          render: ({ context }) => (
            <ConsumptionResult
              onNext={() =>
                funnel.history.push('소비목적결과', (prev) => ({
                  ...prev,
                  ...context,
                  consumptionGoal: '',
                }))
              }
            />
          ),
        })}
        소비목적결과={funnel.Render.with({
          render: ({ context }) => (
            <ConsumptionGoal onComplete={() => console.log('회원가입 완료', context)} />
          ),
        })}
      />
    </Wrapper>
  );
}
