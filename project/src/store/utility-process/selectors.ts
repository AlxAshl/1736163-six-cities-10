import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getCity = (state: State): string => state[NameSpace.Utility].currentCity;
export const getHotelId = (state: State): string => state[NameSpace.Utility].hotelId;
export const getSortingType = (state: State): string => state[NameSpace.Utility].sortingType;
