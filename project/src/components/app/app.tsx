import MainPage from '../../pages/main-page/main-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Favourites from '../../pages/favorites/favourites';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../loading-screen/spinner';
import { useAppSelector } from '../../hooks';


function App(): JSX.Element {

  const {isDataLoaded} = useAppSelector((state) => state);
  if (!isDataLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {([AppRoute.Root, AppRoute.City]).map((path) => <Route key={path.length} path={path} element={<MainPage />} />)}
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favourites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favourites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={
            <Room />
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
