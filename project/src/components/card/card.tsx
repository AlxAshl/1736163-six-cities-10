import {Offer} from '../../types/offer';
import {useState, MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { redirectToRoute } from '../../store/action';
import { setFavoriteAction, fetchFavoriteAction } from '../../store/api-actions';
import { toast } from 'react-toastify';


type CardProps = {
  offer: Offer;
  onCardItemHover: (cardItemId: number) => void
  isMainPage: boolean
}

function Card({offer, onCardItemHover, isMainPage}: CardProps): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const {isPremium, price, title, rating, type, previewImage, id, city, isFavorite} = offer;
  const [isActive, setIsActive] = useState<boolean>(isFavorite);
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timer>();

  const handleCardItemMouseEnter = (event: MouseEvent<HTMLImageElement>) => {
    setDelayHandler(setTimeout(() => {
      onCardItemHover(id);
    }, 700));
  };

  const handleCardItemMouseLeave = () => {
    clearTimeout(delayHandler);
  };

  const bookmarkClickHandler = (event:MouseEvent<HTMLButtonElement>) => {
    if(authorizationStatus === AuthorizationStatus.Auth){
      setIsActive((current) => !current);
      let status = 0;
      if(!isActive){
        status = 1;
      }
      dispatch(setFavoriteAction([status, id]));
      dispatch(fetchFavoriteAction());
      status === 1
        ? toast.success('Added to favorites!')
        : toast.success('Removed from favorites!');
    }
    else{
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <article className={isMainPage ? 'cities__card place-card' : 'near-places__card place-card'}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={isMainPage ? 'cities__image-wrapper place-card__image-wrapper' : 'near-places__image-wrapper place-card__image-wrapper'}>
        <Link to={`/${city.name}/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" onMouseEnter={handleCardItemMouseEnter} onMouseLeave={handleCardItemMouseLeave}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isActive && authorizationStatus === AuthorizationStatus.Auth
            ? 'place-card__bookmark-button--active button'
            : 'place-card__bookmark-button button'} type="button"
          onClick= {bookmarkClickHandler}
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
export default Card;
