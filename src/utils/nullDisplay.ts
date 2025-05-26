export function displayValue(value: any, formatter?: (v: any) => string) {
  if (value === null || value === undefined || value === '') return '-';
  return formatter ? formatter(value) : value;
}
