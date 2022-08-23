import {createReducer} from '@reduxjs/toolkit';
import { citySelector, loadOffers, setError, setDataLoadedStatus, loadComments, hotelId } from './action';
import { Offer } from '../types/offer';
import { Review } from '../types/review';


type InitialState = {
  currentCity: string,
  error: string | null,
  isDataLoaded: boolean,
  serverOffers: Offer[],
  comments: Review[],
  id: string
}

const initialState: InitialState = {
  currentCity: 'Paris',
  error: null,
  isDataLoaded: false,
  serverOffers: [],
  comments: [],
  id: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(citySelector, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.serverOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(hotelId, (state, action) => {
      state.id = action.payload;
    });
});

export {reducer};
