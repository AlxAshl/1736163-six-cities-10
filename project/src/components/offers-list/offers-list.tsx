import Card from '../card/card';
import {useLocation, useParams} from 'react-router-dom';
import {Offer} from '../../types/offer';
import { memo } from 'react';
import { defineLocation } from '../../utils';


type OffersListProps = {
  serverOffers: Offer[]
  onCardItemHover: (cardItemId: number) => void
}

function OffersList({ serverOffers, onCardItemHover}: OffersListProps): JSX.Element {

  const {city} = useParams();
  const filteredOffers = serverOffers.filter((offerObj) => offerObj.city.name === city);
  const currentLocation = useLocation();
  const isMainPage = defineLocation(currentLocation.pathname);

  return (
    <div className={isMainPage ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}>
      {filteredOffers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          onCardItemHover={onCardItemHover}
          isMainPage={isMainPage}
        />
      ))}
    </div>
  );

}

export default memo(OffersList, (prevProps, nextProps) => prevProps.serverOffers === nextProps.serverOffers);

