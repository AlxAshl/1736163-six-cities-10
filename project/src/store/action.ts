import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import {AppRoute} from '../const';


export interface LoadOffers{
  payload: Offer[];
  type: string;
}

export const redirectToRoute = createAction<AppRoute>('login/redirectToRoute');
