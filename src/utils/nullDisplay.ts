export function displayValue(value: unknown, formatter?: (v: string | null | undefined) => string) {
  if (value === null || value === undefined || value === '') return '-';
  if (formatter) return formatter(String(value));
  if (typeof value === 'object') return JSON.stringify(value);

  return String(value);
}