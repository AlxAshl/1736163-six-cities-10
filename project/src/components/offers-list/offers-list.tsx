import Card from '../card/card';
import {useAppSelector} from '../../hooks';
import {useParams} from 'react-router-dom';


function OffersList(): JSX.Element {

  const {city} = useParams();
  const {serverOffers} = useAppSelector((state) => state);
  const filteredOffers = serverOffers.filter((offerObj) => offerObj.city.name === city);

  return (
    <div className="cities__places-list places__list tabs__content">
      {filteredOffers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
        />
      )
      )}
    </div>

  );
}

export default OffersList;
