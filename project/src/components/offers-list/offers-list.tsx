import Card from '../card/card';
import {useAppSelector} from '../../hooks';


function OffersList(): JSX.Element {

  const {offers, currentCity} = useAppSelector((state) => state);
  const filteredOffers = offers.filter((offerObj) => offerObj.city.name === currentCity);

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
