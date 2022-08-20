import {createReducer} from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { citySelector, placesCounter } from './action';

const initialState = {
  currentCity: 'Paris',
  offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(citySelector, (state, action) => {
      state.currentCity = action.payload;
    });
});

export {reducer};
