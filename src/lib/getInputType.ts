import { InputType } from '@/components/TextField/TextField.type';

export const getInputType = ({
  isError,
  isDisabled,
  value,
}: {
  isError?: boolean;
  isDisabled?: boolean;
  value: string;
}): InputType => {
  if (isError) return 'ERROR';
  if (isDisabled) return 'INACTIVE';
  if (value.length > 0) return 'ACTIVE';
  return 'INACTIVE';
};
