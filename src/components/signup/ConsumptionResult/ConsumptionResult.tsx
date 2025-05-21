'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import Button from '@/components/Button/Button';

import { BtnContainer, Container, Title } from '../EmailForm/EmailForm.style';

import { CharacterContainer, Description, ResultCard, Tag } from './ConsumptionResult.style';

const characterList = [
  {
    key: '균형형',
    src: '/icons/webeeBalance_120.svg',
    description: '필요한 것만 소비하는 편이에요',
  },
  { key: '소비형', src: '/icons/webeeConsumption_120.svg', description: '계획적으로 소비해요' },
  {
    key: '실용형',
    src: '/icons/webeePracticality_120.svg',
    description: '필요한 건 아끼지 않고 써요',
  },
  { key: '절약형', src: '/icons/webeeSaving_120.svg', description: '하고 싶은 건 하는 편이에요' },
];

interface ConsumptionResultProps {
  onNext: (consumptionType: string) => void;
  userName: string;
  finalConsumptionType: string;
}

const ConsumptionResult = ({ onNext, userName, finalConsumptionType }: ConsumptionResultProps) => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // finalIndex를 상태로 관리하지 않고, loading이 false일 때 계산
  const finalIndex =
    characterList.findIndex((char) => char.key === finalConsumptionType) ?? 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % characterList.length);
    }, 300);

    const timeout = setTimeout(() => {
      setLoading(false);
      clearInterval(interval);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [finalConsumptionType]);

  return (
    <Container>
      <Title>{userName}님의 소비 성향은...</Title>
      <CharacterContainer>
        {loading ? (
          <ResultCard>
            <Image
              src={characterList[currentIndex].src}
              alt="캐릭터 로딩"
              width={160}
              height={160}
            />
          </ResultCard>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultCard>
              <Image src={characterList[finalIndex].src} alt="최종 캐릭터" width={120} height={120} />
              <Tag>{characterList[finalIndex].key}</Tag>
              <Description>{characterList[finalIndex].description}</Description>
            </ResultCard>
          </motion.div>
        )}
        {!loading && (
          <BtnContainer>
            <Button text="다음으로" size="XL" onClick={() => onNext(characterList[finalIndex].key)} />
          </BtnContainer>
        )}
      </CharacterContainer>
    </Container>
  );
};

export default ConsumptionResult;
