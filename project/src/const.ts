export enum AppRoute {
  Login = '/login',
  Favourites = '/favourites',
  Root = '/',
  City = '/:city',
  Room = ':city/offer/:id'
}

export enum AuthorizationStatus {
  Auth='AUTH',
  NoAuth='NO_AUTH',
  Unknown='UNKNOWN'
}

export enum CityList {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export type CitiesEnum = typeof CityList[keyof typeof CityList];

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments'
}

export const TIMEOUT_SHOW_ERROR = 2000;
