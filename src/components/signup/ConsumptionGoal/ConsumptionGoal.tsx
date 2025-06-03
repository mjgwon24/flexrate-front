'use client';

import { useState } from 'react';

import Image from 'next/image';

import Button from '@/components/Button/Button';
import { CharacterInfo, consumptionGoalMap } from '@/constants/auth.constant';

import {
  CharacterContainer,
  Description,
  ResultCard,
  Tag,
} from '../ConsumptionResult/ConsumptionResult.style';
import { BtnContainer, Container, Title } from '../EmailForm/EmailForm.style';

import { GoalOptionButton, Options } from './ConsumptionGoal.style';

interface ConsumptionGoalProps {
  consumptionType: CharacterInfo;
  onComplete: (selectedGoal: string) => void;
}

const ConsumptionGoal = ({ consumptionType, onComplete }: ConsumptionGoalProps) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const { options } = consumptionGoalMap[consumptionType.key];

  return (
    <Container>
      <Title>소비 목표를 골라주세요</Title>
      <CharacterContainer>
        <ResultCard>
          <Image src={consumptionType.src} alt="최종 캐릭터" width={120} height={120} />
          <Tag>{consumptionType.name}</Tag>
          <Description>{consumptionType.description}</Description>
        </ResultCard>

        <Options>
          {options.map((option) => (
            <GoalOptionButton
              key={option.value}
              selected={selectedGoal === option.value}
              onClick={() => setSelectedGoal(option.value)}
            >
              {option.label}
            </GoalOptionButton>
          ))}
        </Options>

        <BtnContainer>
          <Button
            text="다음으로"
            size="XL"
            disabled={!selectedGoal}
            onClick={() => {
              if (selectedGoal) {
                onComplete(selectedGoal);
              }
            }}
          />
        </BtnContainer>
      </CharacterContainer>
    </Container>
  );
};

export default ConsumptionGoal;
