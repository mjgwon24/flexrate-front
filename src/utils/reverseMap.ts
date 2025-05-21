function reverseMap<T extends Record<string, string>>(map: T, value: string): keyof T | undefined {
  return (Object.entries(map).find(([, v]) => v === value)?.[0]) as keyof T | undefined;
}

export default reverseMap;