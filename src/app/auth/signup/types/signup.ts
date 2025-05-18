// 기본 데이터 타입 (최종 완성 형태)
export interface SignupData {
  email: string;
  password: string;
  method: 'passkey' | 'faceid' | 'pin';
  gender: string;
  birthday: string;
}

export type SignupContextMap = {
  emailRequest: Partial<Pick<SignupData, 'email'>>;
  emailVerify: Required<Pick<SignupData, 'email'>>;
  password: Required<Pick<SignupData, 'email' | 'password'>>;
  method: Required<Pick<SignupData, 'email' | 'password' | 'method'>>;
  gender: Required<Pick<SignupData, 'email' | 'password' | 'method' | 'gender'>>;
  birthday: Required<Pick<SignupData, 'email' | 'password' | 'method' | 'gender' | 'birthday'>>;
  agreement: SignupData;
  analysisLoading: SignupData;
  analysisResult: SignupData;
  usergoal: SignupData;
  complete: SignupData;
};
