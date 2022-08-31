export enum AppRoute {
  Login = '/login',
  Favourites = '/favorite',
  Root = '/',
  DefaultCity = '/Paris',
  City = '/:city',
  Room = ':city/offer/:id',
  Notfound = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
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
export const DEFAULT_MAP_ZOOM = 14;
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite'
}

export enum NameSpace {
  Data = 'DATA',
  Utility = 'UTILITY',
  User = 'USER',
}
