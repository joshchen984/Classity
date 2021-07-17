import axios from 'axios';

const getAuthHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});
export const postApi = async (route: string, data: any, token: string) => {
  const res = await axios.post(route, data, getAuthHeader(token));
  return res;
};

export const getApi = async (route: string, token: string) => {
  const res = await axios.get(route, getAuthHeader(token));
  return res;
};
