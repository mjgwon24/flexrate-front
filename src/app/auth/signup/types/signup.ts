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
  emailRequest: {};
  emailVerify: { email: string };
  password: { email: string; password: string };  // password 필드 추가
  method: { email: string; password: string };
  gender: { email: string; password: string; method: string };
  birthday: { email: string; password: string; method: string; gender: string };
  agreement: { email: string; password: string; method: string; gender: string; birthday: string };
  analysisLoading: { email: string; password: string; method: string; gender: string; birthday: string };
  analysisResult: { email: string; password: string; method: string; gender: string; birthday: string };
  usergoal: { email: string; password: string; method: string; gender: string; birthday: string };
  complete: { email: string; password: string; method: string; gender: string; birthday: string };
}

export type SignupContext = Partial<
  SignupContextMap[keyof SignupContextMap]
>;
