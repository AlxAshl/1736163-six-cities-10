import MainPage from '../../pages/main-page/main-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Favourites from '../../pages/favorites/favourites';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {City} from '../../types/cities';

type AppScreenProps = {
  offers: Offer[],
  reviews: Review[]
  cities: City
}

function App({offers, reviews, cities}: AppScreenProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainPage
              cities = {cities}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favourites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favourites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={
            <Room
              reviews={reviews}
            />
          }
        />
        <Route
          path="*"
          element={<PageNotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
