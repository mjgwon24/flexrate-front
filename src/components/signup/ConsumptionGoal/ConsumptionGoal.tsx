'use client';

import { useState } from 'react';

import Image from 'next/image';

import Button from '@/components/Button/Button';
import { consumptionGoalMap, ConsumptionType } from '@/constants/auth.constant';

import {
  CharacterContainer,
  Description,
  ResultCard,
  Tag,
} from '../ConsumptionResult/ConsumptionResult.style';
import { BtnContainer, Container, Title } from '../EmailForm/EmailForm.style';

import { GoalOptionButton, Options } from './ConsumptionGoal.style';

interface ConsumptionGoalProps {
  consumptionType: ConsumptionType;
  onComplete: (selectedGoal: string) => void;
}

const ConsumptionGoal = ({ consumptionType, onComplete }: ConsumptionGoalProps) => {
  const selectedType = consumptionType;
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const { options } = consumptionGoalMap[selectedType];

  return (
    <Container>
      <Title>소비 목표를 골라주세요</Title>
      <CharacterContainer>
        <ResultCard>
          <Image src={'/icons/webeeSaving_120.svg'} alt="최종 캐릭터" width={120} height={120} />
          <Tag>{selectedType}</Tag>
          <Description>필요한 것만 소비하는 편이에요</Description>
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
