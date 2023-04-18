import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { getToken } from '../save-token/save-token';


const StatusCode: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const searchAnswer = (response: AxiosResponse) => !!StatusCode[response.status];


const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';

export const createAPI = (): AxiosInstance =>{
  const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {'X-Token': getToken()}
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && searchAnswer(error.response)) {
        toast.error(error.response.data.error,{
          theme: 'colored',
          autoClose: 4000
        }
        );
      }
    }
  );
  return api;
};
