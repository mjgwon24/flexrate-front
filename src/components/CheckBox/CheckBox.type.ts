interface CheckboxItemProps {
  size?: 'large' | 'small';
  checked: boolean;
  label: string;
  showMoreText?: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}
