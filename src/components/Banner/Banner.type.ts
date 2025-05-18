'use client';

import { semanticColor } from '@/styles/colors';

export type BannerType = 'SAVING' | 'BALANCE' | 'PRACTICALITY' | 'CONSUMPTION';

export interface BannerProps {
  type: BannerType;
}

interface BannerMeta {
  label: string;
  description: string;
  bgColor: string;
  color: string;
  icon: string;
}

export const bannerMetaMap: Record<BannerType, BannerMeta> = {
  SAVING: {
    label: '절약형',
    description: '필요한 것만 소비하는 편이에요',
    bgColor: semanticColor.bgBtn.active.secondary,
    color: semanticColor.text.normal.accent,
    icon: '/icons/webeeSaving_50.svg',
  },
  BALANCE: {
    label: '균형형',
    description: '계획적으로 소비해요',
    bgColor: semanticColor.bgBtn.active.secondary,
    color: semanticColor.text.normal.accent,
    icon: '/icons/webeeBalance_50.svg',
  },
  PRACTICALITY: {
    label: '실용형',
    description: '필요한 건 아끼지 않고 써요',
    bgColor: semanticColor.bgBtn.active.secondary,
    color: semanticColor.text.normal.accent,
    icon: '/icons/webeePracticality_50.svg',
  },
  CONSUMPTION: {
    label: '소비지향형',
    description: '하고 싶은 건 하는 편이에요',
    bgColor: semanticColor.bgBtn.active.secondary,
    color: semanticColor.text.normal.accent,
    icon: '/icons/webeeConsumption_50.svg',
  },
};
