import { z } from 'zod';

export const creditSchemas = {
  creditAgreement: z.object({
    agreePrivacy: z.boolean().refine((val) => val === true, {
      message: '개인정보 제공에 동의해주세요.',
    }),
    agreeMyDataTerms: z.boolean().refine((val) => val === true, {
      message: '마이데이터 이용 약관에 동의해주세요.',
    }),
    agreeThird: z.boolean(),
    agreeCreditScoreGuide: z.boolean(),
  }),
};
