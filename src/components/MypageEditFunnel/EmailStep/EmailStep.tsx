import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/Button/Button";
import { BtnContainer, BtnWrapper } from "@/components/MypageEditFunnel/EmailStep/EmailStep.style";
import { Title, MainContainer } from "@/components/MypageEditFunnel/MypageEditFunnel.style";
import TextField from "@/components/TextField/TextField";
import { User, useUserStore } from "@/stores/userStore";


interface Props {
  value: { email: string };
  onChange: (ctx: { email: string }) => void;
  onNext: (email: string) => void;
}

const emailSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요")
    .email("이메일 형식이 올바르지 않아요"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export const EmailStep = ({ value, onChange, onNext }: Props) => {
  const user: User | null = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      email: value.email || "",
    },
  });

  const watchedEmail = watch("email");
  React.useEffect(() => {
    if (onChange) onChange({ email: watchedEmail });
  }, [watchedEmail]);

  const onSubmit = (data: EmailFormValues) => {
    onNext(data.email);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <MainContainer>
          <Title>새로운 이메일을 입력해주세요</Title>

          <TextField
            value={watchedEmail}
            onChange={(v: string) => setValue("email", v, { shouldValidate: true })}
            isError={!!errors.email}
            rightContent={{
              type: "DELETE",
              onClick: () => setValue("email", "", { shouldValidate: true }),
            }}
          >
            <TextField.TextFieldBox
              type="text"
              placeholder={user?.email}
              {...register("email")}
            />
            {errors.email && (
              <TextField.ErrorText message={errors.email.message || ""} />
            )}
          </TextField>
        </MainContainer>

        <BtnWrapper>
          <BtnContainer>
            <Button
              text="인증 요청하기"
              type="submit"
              disabled={!isValid}
            />
          </BtnContainer>
        </BtnWrapper>

      </form>
    </>
  );
};
