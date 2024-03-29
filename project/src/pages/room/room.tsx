import Logo from '../../components/logo/logo';
import { useParams } from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CityList} from '../../const';
import CommentForm, { FormDataType } from '../../components/comment-form/comment-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction, fetchCommentAction, fetchHotelAction, fetchNearbytAction, setFavoriteAction, fetchFavoriteAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import { useEffect, useState } from 'react';
import { Offer } from '../../types/offer';
import NavBar from '../../components/nav-bar/nav-bar';
import Preloader from '../../components/preloader/preloader';
import { getComments, getHotel, getLoadedHotelStatus, getLoadedNearbyStatus, getNearby, getOffers } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { hotelId } from '../../store/utility-process/utility-process';
import { MouseEvent } from 'react';
import { toast } from 'react-toastify';


function Room(): JSX.Element {

  const [selectedCard, setSelectedCard] = useState<Offer | undefined>(undefined);
  const handleCardItemHover = (cardItemId: number) => {
    const currentPoint = serverOffers.find((point) => point.id === cardItemId);
    setSelectedCard(currentPoint);
  };
  const [cardUpdated, setCardUpdated] = useState(false);
  const dispatch = useAppDispatch();
  const {id, city} = useParams();

  useEffect(() => {
    setCardUpdated(true);
    const value = id;
    dispatch(hotelId(value));
    dispatch(fetchCommentAction());
    dispatch(fetchNearbytAction());
    dispatch(fetchHotelAction());
  }, [id, dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const serverOffers = useAppSelector(getOffers);
  const hotel = useAppSelector(getHotel);
  const nearby = useAppSelector(getNearby);
  const comments = useAppSelector(getComments);
  const isHotelLoaded = useAppSelector(getLoadedHotelStatus);
  const isNearbyLoaded = useAppSelector(getLoadedNearbyStatus);

  if (city !== undefined && !(Object.values<string>(CityList).includes(city))){
    dispatch(redirectToRoute(AppRoute.Notfound));
  }

  if (hotel === undefined && isHotelLoaded) {
    dispatch(redirectToRoute(AppRoute.Notfound));
    toast.error('Couldn\'t find offer');
  }

  const {isFavorite} = hotel;
  const [isActive, setIsActive] = useState<boolean>(isFavorite);

  const handleButtonClick = (event:MouseEvent<HTMLButtonElement>) => {
    if(authorizationStatus === AuthorizationStatus.Auth){
      setIsActive((current) => !current);
      let status = 0;
      if(!isActive){
        status = 1;
      }
      (dispatch(setFavoriteAction([status, Number(id)]))).then (
        (response) => dispatch(fetchFavoriteAction()),
        (error) => toast.error('Sorry, some connection error has occured, try to reload page.')
      );
      status === 1
        ? toast.success('Added to favorites!')
        : toast.success('Removed from favorites!');
    }
    else{
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  if(!isHotelLoaded && cardUpdated){

    const {bedrooms, description, goods, maxAdults, images, isPremium, price, title, rating, type, host:{avatarUrl, name, isPro}} = hotel;

    return (
      <>
        <div style={{ display: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
        </div>

        <div className="page">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Logo />
                </div>
                <NavBar /*favorites={favorites}*//>
              </div>
            </div>
          </header>

          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {images.map((image) => (
                    <div className="property__image-wrapper" key={image}>
                      <img className="property__image" src={image} alt="" />
                    </div>
                  )
                  )}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {isPremium &&
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>}
                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {title}
                    </h1>
                    <button className={!isActive ? 'property__bookmark-button button' : 'property__bookmark-button--active button'} type="button" onClick={handleButtonClick}>
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{ width: `${20 * rating}%` }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    {<span className="property__rating-value rating__value">{rating}</span>}
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {bedrooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {maxAdults} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {goods.map((item, index) => {
                        const keyValue = `${index}-${item}`;
                        return (
                          <li className="property__inside-item" key={keyValue}>
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="property__user-name">
                        {name}
                      </span>
                      {isPro && <span className="property__user-status">Pro</span>}
                    </div>
                    <div className="property__description">
                      <p className="property__text">
                        {description}
                      </p>
                    </div>
                  </div>
                  <section className="property__reviews reviews">
                    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                    {<ReviewList comments={comments} />}
                    {authorizationStatus === AuthorizationStatus.Auth
                      ? <CommentForm onComment={(formData: FormDataType) => dispatch(postCommentAction(formData))} />
                      : ''}
                  </section>
                </div>
              </div>
              {!isNearbyLoaded && nearby.length !== 0
                ? <Map cityOffers={nearby} selectedCard={selectedCard} />
                : ''}
            </section>

            <div className="container">
              {!isNearbyLoaded &&
              <section className="near-places places">
                {nearby.length === 0
                  ? <h2 className="near-places__title">No other places to stay nearby :/</h2>
                  :
                  <>
                    <h2 className="near-places__title">Other places in the neighbourhood</h2>
                    <OffersList onCardItemHover={handleCardItemHover} serverOffers={nearby} />
                  </>}
              </section>}
            </div>
          </main>
        </div>
      </>
    );
  }

  else{
    return (
      <Preloader/>
    );
  }

}

export default Room;

