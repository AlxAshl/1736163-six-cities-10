import Logo from '../../components/logo/logo';
import {Link, useParams} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getFavorites, getLoadedFavoritesStatus } from '../../store/data-process/selectors';
import NavBar from '../../components/nav-bar/nav-bar';
import Preloader from '../../components/preloader/preloader';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useEffect } from 'react';
import { fetchFavoriteAction } from '../../store/api-actions';
import { store } from '../../store';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';


function Favorites(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const {city} = useParams();
  const isFavoritesLoaded = useAppSelector(getLoadedFavoritesStatus);
  const favorites = useAppSelector(getFavorites);

  const cityList:string[] = [];
  favorites.forEach((favoriteCard) => {
    if(!cityList.includes(favoriteCard.city.name)){
      cityList.push(favoriteCard.city.name);
    }
  });

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth){
      store.dispatch(fetchFavoriteAction());
    }
  },[authorizationStatus]);

  if (!isFavoritesLoaded){
    return (
      <>
        <div style={{display: 'none'}}>
          <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
        </div>
        <div className="page">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Logo />
                </div>
                <NavBar favorites={favorites} city={city}/>
              </div>
            </div>
          </header>
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              {cityList
                ?
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {cityList.map((cityOption, index) => {
                      const keyValue = `${index}-${cityOption}`;
                      return (
                        <li className="favorites__locations-items" key = {keyValue}>
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <Link to={`/${cityOption}`} className="locations__item-link" >
                                <span>{cityOption}</span>
                              </Link>
                            </div>
                          </div>
                          <div className="favorites__places">
                            <FavoritesList cityOption={cityOption} favorites={favorites}/>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
                : <FavoritesEmpty />}

            </div>
          </main>
          <footer className="footer container">
            <Link to={AppRoute.Root} className="footer__logo-link">
              <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
            </Link>
          </footer>
        </div>
      </>
    );
  }

  else{
    return <Preloader />;
  }

}

export default Favorites;
