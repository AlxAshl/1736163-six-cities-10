import {Offer} from '../../types/offer';
import { memo, useState } from 'react';
import FavoriteCard from '../favorites-card/favorites-card';


type OffersListProps = {
  favorites: Offer[],
  cityOption: string
}

function FavoritesList({favorites, cityOption}: OffersListProps): JSX.Element {

  const filteredList = favorites.filter((offerObj) => offerObj.city.name === cityOption);
  const [favoriteList, setFavoritelist] = useState(filteredList);

  const removeFavoriteCard = (cardId: number) => {
    setFavoritelist(favoriteList.filter((card) => card.id !== cardId));
  };

  return (
    <>
      {favoriteList.map((offer) => (
        <FavoriteCard key={offer.id}
          offer={offer}
          remove={removeFavoriteCard}
        />
      ))}
    </>
  );
}

export default memo(FavoritesList);
