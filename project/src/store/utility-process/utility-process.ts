import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {UtilityProcess} from '../../types/state';

const initialState: UtilityProcess = {
  currentCity: 'Paris',
  sortingType: 'Popular',
  hotelId: '',
};


export const utilityProcess = createSlice({
  name: NameSpace.Utility,
  initialState,
  reducers: {
    citySelector: (state, action) => {
      state.currentCity = action.payload;
    },
    hotelId: (state, action) => {
      state.hotelId = action.payload;
    },
    sortSelector: (state, action) => {
      state.sortingType = action.payload;
    },
  },
});

export const {citySelector, hotelId, sortSelector} = utilityProcess.actions;
