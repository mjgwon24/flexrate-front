export type SignupSteps = {
  이메일인증: { email?: string; verifyPassword?: number };
  비밀번호설정: { email: string; password?: string };
  간편비밀번호설정: {
    email: string;
    password: string;
    method: '간편비밀번호';
  };
  내정보입력: {
    email: string;
    password: string;
    method: string;
    gender?: string;
    birthDate?: number;
    name?: string;
  };

  소비성향체크: {
    email: string;
    password: string;
    method: string;
    gender: string;
    birthDate: number;
    name: string;
    agreement?: boolean;
  };
  소비성향결과: {
    email: string;
    password: string;
    method: string;
    gender: string;
    birthDate: number;
    name: string;
    agreement: boolean;
  };
  소비목적결과: {
    email: string;
    password: string;
    method: string;
    gender: string;
    birthDate: number;
    name: string;
    agreement: boolean;
    cosumptionType?: string;
    consumptionGoal?: string;
  };
};
