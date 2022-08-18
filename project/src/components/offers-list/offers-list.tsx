import Card from '../card/card';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {placesCounter} from '../../store/action';
import { useEffect } from 'react';

function OffersList(): JSX.Element {

  const {offers, currentCity} = useAppSelector((state) => state);
  const filteredOffers = offers.filter((offerObj) => offerObj.city.name === currentCity);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const value = filteredOffers.length;
    dispatch(placesCounter(value));
  });

  return (
    <div className="cities__places-list places__list tabs__content">
      {filteredOffers.map((offer) => (
        <Card key={offer.offerId}
          offer={offer}
        />
      )
      )}
    </div>

  );
}

export default OffersList;
