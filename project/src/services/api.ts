import {StatusCodes} from 'http-status-codes';
import axios, {AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import { APIRoute } from '../const';
import { store } from '../store';
import {getToken} from './token';
import {toast} from 'react-toastify';


// const StatusCodeMapping: Record<number, boolean> = {
//   [StatusCodes.BAD_REQUEST]: true,
//   [StatusCodes.UNAUTHORIZED]: true,
//   [StatusCodes.NOT_FOUND]: true,
// };

// const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error: AxiosError) => {
  //     if (error.response && shouldDisplayError(error.response)) {
  //       toast.warn(`${error.message} - ${error.response.data.error}`);
  //     }

  //     throw error;
  //   }
  // );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if(config.url === `${APIRoute.Comments}/`){
        const state = store.getState();
        config.url = `${APIRoute.Comments}/${state.UTILITY.hotelId}`;
      }
      if(config.url === `${APIRoute.Offers}/hotelId/nearby`){
        const state = store.getState();
        config.url = `${APIRoute.Offers}/${state.UTILITY.hotelId}/nearby`;
      }
      if(config.url === `${APIRoute.Offers}/hotel`){
        const state = store.getState();
        config.url = `${APIRoute.Offers}/${state.UTILITY.hotelId}`;
      }
      return config;
    }
  );

  return api;
};

