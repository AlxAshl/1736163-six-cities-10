import {processErrorHandle} from './process-error-handle';
import {StatusCodes} from 'http-status-codes';
import axios, {AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import { APIRoute } from '../const';
import { store } from '../store';


const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        processErrorHandle(error.response.data.error);
      }

      throw error;
    }
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      if(config.url === `${APIRoute.Comments}/`){
        const state = store.getState();
        config.url = `${APIRoute.Comments}/${state.id}`;
      }
      return config;
    }
  );

  return api;
};
