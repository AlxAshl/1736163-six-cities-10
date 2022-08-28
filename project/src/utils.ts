import { AuthorizationStatus } from './const';

export function defineLocation(location: string): boolean {
  if(location){
    return location.search('offer') < 0;
  }
  return false;
}

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
