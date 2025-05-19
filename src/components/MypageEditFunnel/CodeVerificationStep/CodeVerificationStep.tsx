
interface Props {
  value: { email: string; code: string };
  onChange: (ctx: { email: string; code: string }) => void;
  onNext: () => void;
}

export const CodeVerificationStep = ({ value, onChange, onNext }: Props) => {
  const handleChange = (v: string) => onChange({ ...value, code: v });

  return (
    <>
    </>
  );
};
