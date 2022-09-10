import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Offer} from '../types/offer';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {redirectToRoute} from './action';
import {APIRoute, AppRoute} from '../const';
import { Review } from '../types/review.js';
import {saveToken, dropToken} from '../services/token';
import {saveUser} from '../services/user-data';
import { FormDataType } from '../components/comment-form/comment-form.js';


export const fetchOfferAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchCommentAction = createAsyncThunk<Review[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/`);
    return data;
  },
);

export const fetchNearbytAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearby',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/hotelId/nearby`);
    return data;
  },
);

export const fetchHotelAction = createAsyncThunk<Offer, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchHotel',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/hotel`);
    return data;
  }
);

export const fetchFavoriteAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  }
);

export const setFavoriteAction = createAsyncThunk<void, number[], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/setFavourites',
  async ([status,id], {extra: api}) => {
    const response = await api.post<number>(`${APIRoute.Favorite}/${id}/${status}`);
    if(response){
      console.log('ответ с сервера : ', response.status);
    }
  }
);

export const postCommentAction = createAsyncThunk<void, FormDataType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/commentPost',
  async (formData, {extra: api}) => {
    api.post<FormDataType>(`${APIRoute.Comments}/`, formData);

  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    saveUser(email);
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

