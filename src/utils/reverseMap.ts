function reverseMap<T extends Record<string, string>>(map: T, value: string): keyof T | undefined {
  // 소비목적 객체의 [key, value] 쌍 중 value가 주어진 값과 일치하는 항목을 찾고, 해당 key를 반환
  return (Object.entries(map).find(([, v]) => v === value)?.[0]) as keyof T | undefined;
}

export default reverseMap;