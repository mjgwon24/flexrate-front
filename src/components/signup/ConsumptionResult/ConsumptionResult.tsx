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
  onNext: () => void;
}

const ConsumptionResult = ({ onNext }: ConsumptionResultProps) => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  }, []);

  return (
    <Container>
      <Title>서채연님의 소비 성향은...</Title>
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
              <Image src={characterList[0].src} alt="최종 캐릭터" width={120} height={120} />
              <Tag>{characterList[0].key}</Tag>
              <Description>{characterList[0].description}</Description>
            </ResultCard>
          </motion.div>
        )}
        {!loading && (
          <BtnContainer>
            <Button text="다음으로" size="XL" onClick={onNext} />
          </BtnContainer>
        )}
      </CharacterContainer>
    </Container>
  );
};

export default ConsumptionResult;
