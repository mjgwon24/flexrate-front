import axios from '../../lib/axios';

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  goal: 'CONSERVATIVE' | 'PRACTICAL' | 'BALANCED' | 'CONSUMPTION_ORIENTED';
}

export const signup = async (data: SignupPayload) => {
  const response = await axios.post('/auth/signup', data);
  return response.data;
};
