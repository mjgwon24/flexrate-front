'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '@/components/TextField/TextField';
import Button from '@/components/Button/Button';

const schema = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[a-zA-Z]/, '영문자를 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.'),
});

type FormData = z.infer<typeof schema>;

export default function PasswordForm({ onNext }: { onNext: (password: string) => void }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    onNext(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            value={field.value}
            onChange={field.onChange}
            isError={!!errors.password}
            rightContent={{
              type: 'DELETE',
              onClick: () => field.onChange(''),
            }}
            
          >
            <TextField.TextFieldBox 
            type="password" 
            placeholder="비밀번호 입력 (영문+숫자 포함 8자 이상)"
            />
            <TextField.ErrorText message={errors.password?.message ?? ''} />
          </TextField>
        )}
      />

      <Button type="submit" text="다음" disabled={!isValid} />
    </form>
  );
}
