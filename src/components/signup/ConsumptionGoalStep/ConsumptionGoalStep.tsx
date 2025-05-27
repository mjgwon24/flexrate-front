'use client';

import ConsumptionGoal from '@/components/signup/ConsumptionGoal/ConsumptionGoal';
import { CharacterInfo } from '@/constants/auth.constant';
import { usePostSignup } from '@/hooks/usePostSignup';
import { ConsumptionType } from '@/stores/userStore';
import { SignupSteps } from '@/types/funnel.type';

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
            if (data?.accessToken) {
              localStorage.setItem('accessToken', data.accessToken);
              console.log('로컬스토리지에 저장됨:', data.accessToken);
            } else {
              console.warn('회원가입 응답에 엑세스토큰이 없습니다.');
            }
          },
          onError: (error) => {
            console.error('회원가입 오류:', error);
          },
        });
      }}
    />
  );
};

export default ConsumptionGoalStep;
