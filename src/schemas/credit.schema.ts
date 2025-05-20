import { z } from 'zod';

export const creditSchemas = {
  creditAgreeement: z.object({
    agreePrivacy: z.boolean().refine((val) => val === true, {
      message: '개인정보 제공에 동의해주세요.',
    }),
    agreeService: z.boolean().refine((val) => val === true, {
      message: '서비스 이용 약관에 동의해주세요.',
    }),
  }),
};
