import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { Review } from './review';
import { Offer } from './offer';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
  errorMessage: string,
  initialConnection: boolean,
};

export type DataProcess = {
  // isFavouritesSet: boolean, // возможно потребуется когда нужно будет обновить статус(количество)
  isDataLoaded: boolean,
  isHotelLoaded: boolean,
  isNearbyLoaded: boolean,
  isFavoritesLoaded: boolean,
  isPostLoaded: boolean,
  serverOffers: Offer[],
  unsortedOffers: Offer[],
  comments: Review[],
  nearby: Offer[],
  hotel: Offer,
  favorite: Offer[],
}

export type UtilityProcess = {
  currentCity: string,
  sortingType: string,
  hotelId: string,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
