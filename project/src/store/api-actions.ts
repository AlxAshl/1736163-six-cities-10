import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Offer} from '../types/offer';
import {loadOffers, loadComments, setError, setDataLoadedStatus} from './action';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {store} from './';
import { Review } from '../types/review.js';


export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setDataLoadedStatus(true));
  },
);

export const fetchCommentAction = createAsyncThunk<void, undefined, {//2) функция делает запрост на сервер
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/`);
    dispatch(loadComments(data));
  },
);

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
