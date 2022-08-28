import MainPage from '../../pages/main-page/main-page';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import {AppRoute} from '../../const';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {getAuthorizationStatus} from '../../store/user-process/selectors';


function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        {([AppRoute.Root, AppRoute.City]).map((path) => <Route key={path.length} path={path} element={<MainPage />} />)}
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favourites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
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
          path={AppRoute.Notfound}
          element={<PageNotFound/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
