'use client';
import React from 'react';
import { useFunnel } from '@use-funnel/browser';
import type { SignupContextMap } from '../signup/types/signup';
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

type SignupSteps = keyof SignupContextMap;

type AnyFunnelRender = (props: {
  [K in SignupSteps]: (args: { context: SignupContextMap[K] }) => React.ReactNode;
}) => JSX.Element;

export default function SignupPage() {
  const funnel = useFunnel<SignupContextMap>({
    id: 'signup',
    initial: {
      step: 'emailRequest',
      context: {},
    },
  });

  const Render = funnel.Render as AnyFunnelRender;

  return (
    <Render
      emailRequest={() => (
        <SignupEmailRequest
          onNext={(email: string) => {
            funnel.history.push('emailVerify', { email });
          }}
        />
      )}

      emailVerify={({ context }) => (
        <SignupEmailVerify
          defaultEmail={context.email}
          onVerify={(email: string) => {
            funnel.history.push('password', { email });
          }}
        />
      )}

      password={({ context }) => (
        <SignupPassword
          email={context.email}
          onNext={(password: string) => {
            funnel.history.push('method', { email: context.email, password });
          }}
        />
      )}

      method={({ context }) => (
        <SignupMethodSelector
          onSelect={(method) => {
            funnel.history.push('gender', { ...context, method });
          }}
        />
      )}

      gender={({ context }) => (
        <Gender
          onNext={(gender: string) => {
            funnel.history.push('birthday', { ...context, gender });
          }}
        />
      )}


      birthday={({ context }) => (
        <Birthday
          onNext={(birthday: string) => {
            funnel.history.push('agreement', { ...context, birthday });
          }}
        />
      )}

      agreement={({ context }) => (
        <Agreement 
          onAgree={() => {
            funnel.history.push('analysisLoading', context);
          }} 
        />
      )}

      analysisLoading={({ context }) => (
        <AnalysisLoading />
      )}

      analysisResult={({ context }) => (
        <AnalysisResult 
          onNext={() => {
            funnel.history.push('usergoal', context);
          }} 
        />
      )}

      usergoal={({ context }) => (
        <UserGoal 
          onNext={() => {
            funnel.history.push('complete', context);
          }} 
        />
      )}

      complete={({ context }) => (
        <SignupComplete />
      )}
    />
  );
}
