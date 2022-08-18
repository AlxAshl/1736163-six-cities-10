import {createAction} from '@reduxjs/toolkit';

export const citySelector = createAction('mainPage/citySelector', (value) => ({
  payload: value,
}));

export const placesCounter = createAction('card/placesCount', (value) => ({
  payload: value,
}));
