import {Offer} from '../../types/offer';
import {useState, MouseEvent} from 'react';
import {Link} from 'react-router-dom';


type CardProps = {
  offer: Offer;
  onCardItemHover: (cardItemId: number) => void
  isMainPage: boolean
}

function Card({offer, onCardItemHover, isMainPage}: CardProps): JSX.Element {

  const {isPremium, price, description, rating, type, previewImage, id, city} = offer;
  const [isActive, setIsActive] = useState(false);
  const [delayHandler, setDelayHandler] = useState<any>();// ОПРЕДЕЛИТЬ ТИП
  const cardItemHoverHandler = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setDelayHandler((setTimeout(() => {
      onCardItemHover(id);
    }, 700)));
  };

  const handleMouseLeave = () => {
    clearTimeout(delayHandler);
  };

  return (
    <article className={isMainPage ? 'cities__card place-card' : 'near-places__card place-card'}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={isMainPage ? 'cities__image-wrapper place-card__image-wrapper' : 'near-places__image-wrapper place-card__image-wrapper'}>
        <Link to={`/${city.name}/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" onMouseEnter={cardItemHoverHandler} onMouseLeave={handleMouseLeave}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isActive ? 'place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button"
            onClick={({target}: MouseEvent<HTMLButtonElement>) => {
              setIsActive((current) => !current);
            }}
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
        {description ?
          <h2 className="place-card__name">
            <Link to={`offer/${id}`}>{description}</Link>
          </h2> : null }
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}
export default Card;
