export function displayValue(value: unknown, formatter?: (v: string | number | null | undefined) => string) {
  if (value === null || value === undefined || value === '') return '-';
  if (formatter) return formatter(value as never);
  if (typeof value === 'object') return JSON.stringify(value);

  return String(value);
}