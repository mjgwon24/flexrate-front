// src/app/signup/types/signup.ts 예시

export type SignupSteps =
  | 'emailRequest'
  | 'emailVerify'
  | 'password'
  | 'method'
  | 'gender'
  | 'birthday'
  | 'agreement'
  | 'analysisLoading'
  | 'analysisResult'
  | 'usergoal'
  | 'complete';

export interface SignupContextMap {
  emailRequest: {}; // 초기 단계에는 아무 것도 없을 수 있음
  emailVerify: { email: string };
  password: { email: string; };
  method: { email: string; password: string };
  gender: { email: string; password: string; method: string };
  birthday: { email: string; password: string; method: string; gender: string };
  agreement: { email: string; password: string; method: string; gender: string; birthday: string };
  analysisLoading: { email: string; password: string; method: string; gender: string; birthday: string };
  analysisResult: { email: string; password: string; method: string; gender: string; birthday: string };
  usergoal: { email: string; password: string; method: string; gender: string; birthday: string };
  complete: { email: string; password: string; method: string; gender: string; birthday: string };
}
