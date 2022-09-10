import Logo from '../../components/logo/logo';
import SortingList from '../../components/sorting-list/sorting-list';
import OffersList from '../../components/offers-list/offers-list';
import { useParams } from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CityList} from '../../const';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { useEffect, useState } from 'react';
import Preloader from '../../components/preloader/preloader';
import NavBar from '../../components/nav-bar/nav-bar';
import { store } from '../../store';
import {fetchFavoriteAction, fetchOfferAction} from '../../store/api-actions';
import { Offer } from '../../types/offer';
import { redirectToRoute } from '../../store/action';
import MainEmpty from '../../components/main-empty/main-empty';
import { getFavorites, getLoadedDataStatus, getLoadedFavoritesStatus, getOffers } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';


store.dispatch(fetchOfferAction());

function MainPage(): JSX.Element {

  const {city} = useParams();
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const isFavoritesLoaded = useAppSelector(getLoadedFavoritesStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const serverOffers = useAppSelector(getOffers);
  // const favorites = useAppSelector(getFavorites);
  const cityOffers = serverOffers.filter((offerObj) => offerObj.city.name === city);
  const dispatch = useAppDispatch();
  const [selectedCard, setSelectedCard] = useState<Offer | undefined>(undefined);

  const handleCardItemHover = (cardItemId: number) => {
    const currentPoint = serverOffers.find((point) => point.id === cardItemId);
    setSelectedCard(currentPoint);
  };

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth){
      store.dispatch(fetchFavoriteAction());
    }
  },[authorizationStatus]);

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth && isFavoritesLoaded){
      dispatch(fetchFavoriteAction());
    }
    if (city === undefined && city !== AppRoute.Notfound) {
      dispatch(redirectToRoute(AppRoute.DefaultCity));
    }
    if (city && city !== ''){
      if(!Object.keys(CityList).includes(city)){
        dispatch(redirectToRoute(AppRoute.Notfound));
      }
    }
    store.dispatch(fetchOfferAction);
  });

  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page page--gray page--main">
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
        <main className={cityOffers.length === 0 ? 'page__main page__main--index page__main--index-empty' : 'page__main page__main--index'}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list" >
                <CitiesList />
              </ul>
            </section>
          </div>
          {cityOffers.length === 0
            ? <MainEmpty />
            :
            <div className="cities">
              {isDataLoaded
                ? <Preloader />
                :
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{cityOffers.length} places to stay in {city}</b>
                    <SortingList />
                    {serverOffers
                      ? <OffersList onCardItemHover={handleCardItemHover} serverOffers={serverOffers} />
                      : null}
                  </section>
                  <div className="cities__right-section">
                    {serverOffers && cityOffers.length !== 0
                      ? <Map cityOffers={cityOffers} selectedCard={selectedCard}/>
                      : <Preloader />}
                  </div>
                </div>}
            </div>}
        </main>
      </div>
    </>
  );
}

export default MainPage;
