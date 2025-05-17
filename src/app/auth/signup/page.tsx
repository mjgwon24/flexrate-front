// src/app/signup/page.tsx
'use client';
import React from 'react';
import { useFunnel } from '@use-funnel/browser';
import { SignupSteps, SignupContext } from './types/signup';
import SignupEmailRequest from './components/SignupEmailRequest';
import SignupEmailVerify from './components/SignupEmailVerify';
import SignupPassword from './components/SignupPassword';
import SignupMethodSelector from './components/SignupMethodSelector';
import Gender from './components/Gender';
import Birthday from './components/Birthday';
import Agreement from './components/Agreement';
import AnalysisLoading from './components/AnalysisLoading';
import AnalysisResult from './components/AnalysisResult';
import UserGoal from './components/UserGoal';
import SignupComplete from './components/SignupComplete';

// 정확한 타입 지정: 단계 이름과 context 속성 정의
type StepKeys =
  | 'emailRequest'
  | 'emailVerify'
  | 'password'
  | 'method'
  | 'gender'
  | 'birthday'
  | 'agreement'
  | 'analysisLoading'
  | 'analysisResult'
  | 'usergoal'
  | 'complete';

// context 타입 정의 (단계별로 추가되는 값들을 포함)
interface SignupContext {
  email?: string;
  password?: string;
  method?: string;
  gender?: string;
  birthday?: string;
  // 추가 context 필드들 필요시 선언
}

export default function SignupPage() {
  // useFunnel에 명확한 제네릭 타입 지정
  const funnel = useFunnel<StepKeys, SignupContext>({
    id: 'signup',
    initial: { step: 'emailRequest', context: {} }
  });

  return (
    <funnel.Render
      emailRequest={funnel.Render.with({
        render: () => (
          <SignupEmailRequest
            onNext={(email: string) =>
              funnel.history.push('emailVerify', { email })
            }
          />
        )
      })}

      emailVerify={funnel.Render.with({
        render: ({ context }) => (
          <SignupEmailVerify
            defaultEmail={context.email ?? ''}
            onVerify={() => funnel.history.push('password', context)}
          />
        )
      })}

      password={funnel.Render.with({
        render: ({ context }) => (
          <SignupPassword
            email={context.email ?? ''}
            onNext={(password: string) =>
              funnel.history.push('method', { ...context, password })
            }
          />
        )
      })}

      method={funnel.Render.with({
        render: ({ context }) => (
          <SignupMethodSelector
            onSelect={(method: string) =>
              funnel.history.push('gender', { ...context, method })
            }
          />
        )
      })}

      gender={funnel.Render.with({
        render: ({ context }) => (
          <Gender
            onNext={(gender: string) =>
              funnel.history.push('birthday', { ...context, gender })
            }
          />
        )
      })}

      birthday={funnel.Render.with({
        render: ({ context }) => (
          <Birthday
            onNext={(birthday: string) =>
              funnel.history.push('agreement', { ...context, birthday })
            }
          />
        )
      })}

      agreement={funnel.Render.with({
        render: ({ context }) => (
          <Agreement onAgree={() => funnel.history.push('analysisLoading', context)} />
        )
      })}

      analysisLoading={funnel.Render.with({
        render: () => <AnalysisLoading />
      })}

      analysisResult={funnel.Render.with({
        render: () => <AnalysisResult onNext={() => funnel.history.push('usergoal')} />
      })}

      usergoal={funnel.Render.with({
        render: () => <UserGoal onNext={() => funnel.history.push('complete')} />
      })}

      complete={funnel.Render.with({
        render: () => <SignupComplete />
      })}
    />
  );
}
