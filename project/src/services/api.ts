import axios, {AxiosInstance} from 'axios';
import { getToken } from './save-token/save-token';

const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';

export const createAPI = (): AxiosInstance =>{
  const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {'X-Token': getToken()}
  });
  return api;
};
