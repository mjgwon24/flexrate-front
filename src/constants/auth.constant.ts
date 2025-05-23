export interface ConsumptionOption {
  label: string;
  value: string;
}

export interface ConsumptionGoalSet {
  intro: string;
  options: ConsumptionOption[];
}

export type ConsumptionTypeKey = 'BALANCED' | 'CONSUMPTION_ORIENTED' | 'PRACTICAL' | 'CONSERVATIVE';

export const consumptionGoalMap: Record<ConsumptionTypeKey, ConsumptionGoalSet> = {
  CONSERVATIVE: {
    intro: '최대한 아껴서 써요',
    options: [
      { label: '오늘 하루, 지출 없이 보내고싶어요', value: 'NO_SPENDING_TODAY' },
      { label: '하루 식비로 10,000원 이상 쓰고싶지 않아요', value: 'LIMIT_DAILY_MEAL' },
      { label: '수입 70% 이상을 저축해요', value: 'SAVE_70_PERCENT' },
      { label: '지출보다 수익이 많아요', value: 'INCOME_OVER_EXPENSE' },
    ],
  },
  PRACTICAL: {
    intro: '필요한 것만 써요',
    options: [
      { label: '대중교통만 이용해요', value: 'ONLY_PUBLIC_TRANSPORT' },
      { label: '구매하기 전에 가격을 비교해요', value: 'COMPARE_BEFORE_BUYING' },
      { label: '주택청약을 들고 있어요', value: 'HAS_HOUSING_SAVING' },
      { label: '10만원 이하의 의류를 소비해요', value: 'CLOTHING_UNDER_100K' },
    ],
  },
  BALANCED: {
    intro: '계획적으로 소비해요',
    options: [
      { label: '오늘은 하나의 카테고리에만 소비해보세요', value: 'ONE_CATEGORY_SPEND' },
      { label: '매달 소액의 저축을 목표로 해요', value: 'SMALL_MONTHLY_SAVE' },
      { label: '필요하지 않은 가전제품은 구매하지 않아요', value: 'NO_USELESS_ELECTRONICS' },
      { label: '평균 지출의 10% 이상 소비해요', value: 'OVER_10_PERCENT' },
    ],
  },
  CONSUMPTION_ORIENTED: {
    intro: '하고 싶은 건 하는 편이에요',
    options: [
      { label: '만원을 넘기는 디저트와 커피는 사치에요', value: 'NO_EXPENSIVE_DESSERT' },
      { label: '하루에 5만원 이상의 무리한 소비는 하지 않아요', value: 'NO_OVER_50K_PER_DAY' },
      { label: '월 구독비로 5만원을 넘기지 않아요', value: 'SUBSCRIPTION_UNDER_50K' },
      { label: '2만원이 넘는 밥값은 소비하지 않는 편이에요', value: 'MEAL_UNDER_20K' },
    ],
  },
};

export interface CharacterInfo {
  key: ConsumptionTypeKey;
  src: string;
  description: string;
  name: string;
}

export const characterList: CharacterInfo[] = [
  {
    key: 'BALANCED',
    src: '/icons/webeeBalance_120.svg',
    description: '계획적으로 소비해요',
    name: '균형형',
  },
  {
    key: 'CONSUMPTION_ORIENTED',
    src: '/icons/webeeConsumption_120.svg',
    description: '하고 싶은 건 하는 편이에요',
    name: '소비지향형',
  },
  {
    key: 'PRACTICAL',
    src: '/icons/webeePracticality_120.svg',
    description: '필요한 건 아끼지 않고 써요',
    name: '실용형',
  },
  {
    key: 'CONSERVATIVE',
    src: '/icons/webeeSaving_120.svg',
    description: '필요한 것만 소비하는 편이에요',
    name: '절약형',
  },
];
