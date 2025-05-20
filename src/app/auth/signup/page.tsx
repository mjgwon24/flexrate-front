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
import { api } from '@/lib/axios';
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
                // 이메일 입력 후 비밀번호 설정 단계로 이동
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
                // 비밀번호 설정 후 선택된 방법에 따라 다음 단계로 이동
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
                gender: context.gender as 'MALE' | 'FEMALE',
                // number 타입의 birthDate를 "YYYY-MM-DD" 문자열로 변환
                birthDate:
                  typeof context.birthDate === 'number'
                    ? new Date(context.birthDate).toISOString().slice(0, 10)
                    : context.birthDate ?? '',
                name: context.name ?? '',
              }}
              onNext={({
                gender,
                birthDate,
                name,
              }: { gender: string; birthDate: string; name: string }) => void
                // 유저 정보 입력 후 소비 성향 체크 단계로 이동
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
                  ...(prev as SignupSteps['소비성향결과']), // 타입 단언 추가
                  agreement: true,
                }))
              }
            />
          ),
        })}
        소비성향결과={funnel.Render.with({
          render: ( {context}) => (
            <ConsumptionResult
              userName={context.name ?? '사용자'}
              onNext={() =>
                funnel.history.push('소비목적결과', (prev) => ({
                  ...(prev as SignupSteps['소비목적결과']), // 타입 단언 추가
                  consumptionGoal: '',
                }))
              }
            />
          ),
        })}
        소비목적결과={funnel.Render.with({
          render: ({ context }) => (
            <ConsumptionGoal
              consumptionType={context.consumptionType}
              onComplete={async (selectedGoal) => {
                const signupData = {
                  email: context.email,
                  password: context.password,
                  sex: context.gender,
                  name: context.name,
                  birthDate: context.birthDate,
                  consumptionType: context.consumptionType,
                  consumeGoal: selectedGoal,
                };

                console.log('서버로 보내는 회원가입 데이터:', signupData);

                try {
                  const response = await api.post('/api/auth/signup/password', signupData);
                  console.log('회원가입 완료', response.data);
                  // 성공 후 리다이렉트 혹은 상태 변경 로직 추가
                } catch (error) {
                  console.error('회원가입 에러:', error);
                  // 에러 UI 처리 추가
                }
              }}
            />
          ),
        })}
      />
    </Wrapper>
  );
};

export default SignupPage;
