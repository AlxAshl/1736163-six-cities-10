import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import { Review } from '../../types/review';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].serverOffers;
export const getUnsortOffers = (state: State): Offer[] => state[NameSpace.Data].unsortedOffers;
export const getComments = (state: State): Review[] => state[NameSpace.Data].comments;
export const getNearby = (state: State): Offer[] => state[NameSpace.Data].nearby;
export const getHotel = (state: State): Offer => state[NameSpace.Data].hotel;
export const getFavorites = (state: State): Offer[] => state[NameSpace.Data].favorite;
export const getLoadedFavoritesStatus = (state: State): boolean => state[NameSpace.Data].isFavoritesLoaded;//?????
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getLoadedHotelStatus = (state: State): boolean => state[NameSpace.Data].isHotelLoaded;
export const getLoadedNearbyStatus = (state: State): boolean => state[NameSpace.Data].isNearbyLoaded;
export const getLoadedsetFavoriteStatus = (state: State): boolean => state[NameSpace.Data].isSetFavouritesSet;
