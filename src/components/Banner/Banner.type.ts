'use client';

import { ConsumptionType } from '@/stores/userStore';
import { semanticColor } from '@/styles/colors';

export interface BannerProps {
  isWithReport?: boolean;
  type?: ConsumptionType;
  borderNone?: boolean;
}

interface BannerMeta {
  label: string;
  description: string;
  bgColor: string;
  color: string;
  icon: string;
}

const defaultBannerMeta = {
  bgColor: semanticColor.bgBtn.active.secondary,
  color: semanticColor.text.normal.accent,
};

export const bannerMetaMap: Record<ConsumptionType, BannerMeta> = {
  CONSERVATIVE: {
    ...defaultBannerMeta,
    label: '절약형',
    description: '필요한 것만 소비하는 편이에요',
    icon: '/icons/webeeSaving_50.svg',
  },
  BALANCED: {
    ...defaultBannerMeta,
    label: '균형형',
    description: '계획적으로 소비해요',
    icon: '/icons/webeeBalance_50.svg',
  },
  PRACTICAL: {
    ...defaultBannerMeta,
    label: '실용형',
    description: '필요한 건 아끼지 않고 써요',
    icon: '/icons/webeePracticality_50.svg',
  },
  CONSUMPTION_ORIENTED: {
    ...defaultBannerMeta,
    label: '소비지향형',
    description: '하고 싶은 건 하는 편이에요',
    icon: '/icons/webeeConsumption_50.svg',
  },
};
