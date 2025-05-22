import { CharacterInfo, characterList, ConsumptionTypeKey } from '@/constants/auth.constant';

// "20010824" → "2001-08-24", 유효한 날짜일 때만 반환
export const formatBirthDateIfPossible = (input: string): string => {
  const raw = input.replace(/\D/g, '');
  if (raw.length !== 8) return raw;

  const year = Number(raw.slice(0, 4));
  const month = Number(raw.slice(4, 6));
  const day = Number(raw.slice(6, 8));

  const isValidDate = (y: number, m: number, d: number) => {
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  };

  if (!isValidDate(year, month, day)) return raw;

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const characterMap: Record<ConsumptionTypeKey, CharacterInfo> = characterList.reduce(
  (acc, cur) => {
    acc[cur.key] = cur;
    return acc;
  },
  {} as Record<ConsumptionTypeKey, CharacterInfo>
);

// 소비목적 객체의 [key, value] 쌍 중 value가 주어진 값과 일치하는 항목을 찾고, 해당 key를 반환
export const reverseMap = <T extends Record<string, string>>(
  map: T,
  value: string
): keyof T | undefined =>
  Object.entries(map).find(([, v]) => v === value)?.[0] as keyof T | undefined;
