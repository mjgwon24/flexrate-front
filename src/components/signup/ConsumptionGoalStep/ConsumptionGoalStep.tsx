'use client';

import { usePostSignup } from '@/hooks/usePostSignup';
import ConsumptionGoal from '@/components/signup/ConsumptionGoal/ConsumptionGoal';
import { SignupSteps } from '@/types/funnel.type';
import { CharacterInfo } from '@/constants/auth.constant';
import { ConsumptionType } from '@/stores/userStore';

const ConsumptionGoalStep = ({
  context,
  character,
}: {
  context: SignupSteps['소비목적결과'];
  character: CharacterInfo;
}) => {
  const signupMutation = usePostSignup();

  return (
    <ConsumptionGoal
      consumptionType={character}
      onComplete={(selectedGoal) => {
        const signupData = {
          email: context.email,
          password: context.password,
          sex: context.sex as 'MALE' | 'FEMALE',
          name: context.name,
          birthDate: context.birthDate,
          consumptionType: context.consumptionType as ConsumptionType,
          consumeGoal: selectedGoal,
        };

        signupMutation.mutate(signupData, {
          onSuccess: (data) => {
            // 서버 응답 data 안에 userId가 있다고 가정
            if (data?.userId) {
              localStorage.setItem('memberId', data.userId.toString());
              console.log('memberId saved to localStorage:', data.userId);
            } else {
              console.warn('회원가입 응답에 userId가 없습니다.');
            }
          },
          onError: (error) => {
            console.error('회원가입 실패:', error);
          },
        });
      }}
    />
  );
};

export default ConsumptionGoalStep;
