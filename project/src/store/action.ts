import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const citySelector = createAction('mainPage/citySelector', (value) => ({
  payload: value,
}));
export const hotelId = createAction('room/hotelId', (value) => ({
  payload: value,
}));
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadComments = createAction<Review[]>('data/loadComments');
export const setError = createAction<string | null>('mainPage/setError');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

