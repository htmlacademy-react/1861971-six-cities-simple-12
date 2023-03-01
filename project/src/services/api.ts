import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';

export const createAPI = (): AxiosInstance =>{
  const api = axios.create({
    baseURL: BACKEND_URL
  });
  return api;
};
