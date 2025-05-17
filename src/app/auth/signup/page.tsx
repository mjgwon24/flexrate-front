'use client';
import React from 'react';
import { useFunnel } from '@use-funnel/browser';
import type { SignupSteps, SignupContextMap } from './types/signup';
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

// 회원가입 단계별 흐름 관리페이지
// @author 윤영찬
// @since 2025-05-17

export default function SignupPage() {
  const funnel = useFunnel<SignupSteps, SignupContextMap>({
    id: 'signup',
    initial: { step: 'emailRequest', context: {} as SignupContextMap['emailRequest'] }
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
            defaultEmail={context.email}
            onVerify={() => funnel.history.push('password', { ...context })}
          />
        )
      })}

      password={funnel.Render.with({
        render: ({ context }) => (
          <SignupPassword
            email={context.email}
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
        render: ({ context }) => <AnalysisLoading />
      })}

      analysisResult={funnel.Render.with({
        render: ({ context }) => (
          <AnalysisResult onNext={() => funnel.history.push('usergoal', context)} />
        )
      })}

      usergoal={funnel.Render.with({
        render: ({ context }) => (
          <UserGoal onNext={() => funnel.history.push('complete', context)} />
        )
      })}

      complete={funnel.Render.with({
        render: () => <SignupComplete />
      })}
    />
  );
}
