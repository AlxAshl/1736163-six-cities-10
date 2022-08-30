import {Offer} from '../../types/offer';
import {useState, MouseEvent, memo} from 'react';
import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';

import { setFavoriteAction } from '../../store/api-actions';

type CardProps = {
  offer: Offer;
  remove: (cardId: number) => void;
}
function FavoriteCard({offer, remove}: CardProps): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const {isPremium, price, title, rating, type, previewImage, id, city, isFavorite} = offer;
  const [isActive, setIsActive] = useState<boolean>(isFavorite);

  const bookmarkClickHandler = (event:MouseEvent<HTMLButtonElement>) => {
    if(authorizationStatus === AuthorizationStatus.Auth){
      setIsActive((current) => !current);
      const status = 0;
      remove(offer.id);
      dispatch(setFavoriteAction([status, id]));
    }
  };

  return (
    <article className="favorites__card place-card">
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <Link to={`/${city.name}/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isActive && authorizationStatus === AuthorizationStatus.Auth
            ? 'place-card__bookmark-button--active button'
            : 'place-card__bookmark-button button'} type="button"
          onClick={bookmarkClickHandler}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${20 * rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        {title ?
          <h2 className="place-card__name">
            <Link to={`offer/${id}`}>{title}</Link>
          </h2> : null }
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}
export default memo(FavoriteCard);
