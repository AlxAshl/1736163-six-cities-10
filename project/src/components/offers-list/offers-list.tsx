import Card from '../card/card';
import {useAppSelector} from '../../hooks';
import {useParams} from 'react-router-dom';


function OffersList(): JSX.Element {

  const {city} = useParams();
  const {offers} = useAppSelector((state) => state);
  const filteredOffers = offers.filter((offerObj) => offerObj.city.name === city);

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
