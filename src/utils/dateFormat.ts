export const formatYMD = ({ dateString }: { dateString?: string | null }): string => {
  if (!dateString) return '-';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yy}.${mm}.${dd}`;
};

export const splitYMD = ({
  dateString,
}: {
  dateString?: string | null;
}): {
  year?: string;
  month?: string;
  day?: string;
} => {
  if (!dateString) return {};

  const parts = dateString.split('-');
  if (parts.length !== 3) return {};

  const [year, month, day] = parts;
  return { year, month, day };
};
