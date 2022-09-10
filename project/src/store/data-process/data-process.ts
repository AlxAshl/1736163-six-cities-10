import {createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import browserHistory from '../../browser-history';
import {NameSpace} from '../../const';
import { Offer } from '../../types/offer';
import {DataProcess} from '../../types/state';
import {fetchCommentAction, fetchFavoriteAction, fetchHotelAction, fetchNearbytAction, fetchOfferAction, postCommentAction} from '../api-actions';


const initialState: DataProcess = {
  // isFavouritesSet: false,
  isDataLoaded:false,
  isHotelLoaded: false,
  isNearbyLoaded: false,
  isFavoritesLoaded: false,
  isPostLoaded: false,
  serverOffers: [],
  unsortedOffers: [],
  comments: [],
  nearby: [],
  hotel:  {} as Offer,
  favorite: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.serverOffers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.serverOffers = action.payload;
        state.unsortedOffers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchHotelAction.pending, (state) => {
        state.isHotelLoaded = true;
      })
      .addCase(fetchHotelAction.fulfilled, (state, action) => {
        state.hotel = action.payload;
        state.isHotelLoaded = false;
      })
      .addCase(fetchCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchCommentAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchNearbytAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
        state.isNearbyLoaded = false;
      })
      .addCase(fetchNearbytAction.pending, (state) => {
        state.isNearbyLoaded = true;
      })
      .addCase(fetchNearbytAction.rejected, (state) => {
        browserHistory.push('/*');
        state.isNearbyLoaded = true;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorite = action.payload;
        state.isFavoritesLoaded = false;
      })
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.isFavoritesLoaded = true;
      })
      // .addCase(setFavoriteAction.fulfilled, (state) => {
      //   state.isFavouritesSet = false;
      // })
      // .addCase(setFavoriteAction.pending, (state) => {
      //   state.isFavouritesSet = true;
      // })
      .addCase(postCommentAction.fulfilled, (state) => {
        state.isPostLoaded = false;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isPostLoaded = false;
        toast.error('Couldnt send your post, something went wrong');
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isPostLoaded = true;
      });
  }
});

export const {loadOffers} = dataProcess.actions;

