import axios from "./axios";


export const login = async (email, password) => {
  const { data } = await axios.post('auth/login', { email, password });
  return data;
};

export const logout = async () => {
  const { data } = await axios.post('auth/logout');
  return data;
};

export const verifyToken = async () => {
  const { data } = await axios.get('auth/verify-token');
  return data;
}

//Apis PF
export const loginPF = async (email, password) => {
  const { data } = await axios.post('auth/loginPF', { email, password });
  console.log(data)
  return data;
};

export const logoutPF = async () => {
  const { data } = await axios.post('auth/logoutPF');
  return data;
};

export const verifyTokenPF = async () => {
  const { data } = await axios.get('auth/verify-tokenPF');
  return data;
}
