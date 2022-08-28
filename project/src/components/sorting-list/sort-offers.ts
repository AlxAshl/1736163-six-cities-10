import { store } from '../../store';
import { fetchOfferAction } from '../../store/api-actions';
import { loadOffers } from '../../store/data-process/data-process';
import { Offer } from '../../types/offer';


export function sortOffers(sortingType: string, serverOffers: Offer[]){

  let sortedOffers: Offer[] = [];
  switch (sortingType) {
    case 'Price: low to high':
      sortedOffers = [...serverOffers].sort((a, b) => (a.price < b.price ? -1 : 1));
      break;
    case 'Price: high to low':
      sortedOffers = [...serverOffers].sort((a, b) => (a.price > b.price ? -1 : 1));
      break;
    case 'Top rated first':
      sortedOffers = [...serverOffers].sort((a, b) => (a.rating > b.rating ? -1 : 1));
      break;
    default:
      store.dispatch(fetchOfferAction());
      sortedOffers = [...serverOffers];
      break;
  }
  store.dispatch(loadOffers(sortedOffers));
  //устранить перерисовку при возврате на Popular
}
