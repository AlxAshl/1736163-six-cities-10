import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser } from '../../services/user-data';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';


type NavBarTypes = {
  favorites: Offer[];
}

function NavBar({favorites}: NavBarTypes): JSX.Element {

  const userName = getUser();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth
          ?
          <li className="header__nav-item user">
            <Link to={AppRoute.Favourites} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{userName}</span>
              <span className="header__favorite-count">{favorites.length}</span>
            </Link>
          </li>
          : null}
        {authorizationStatus === AuthorizationStatus.Auth
          ?
          <li className="header__nav-item">
            <Link to={AppRoute.Root} className="header__nav-link">
              <span className="header__signout" onClick={handleLogoutClick}>Sign out</span>
            </Link>
          </li>
          :
          <li className="header__nav-item">
            <Link to={AppRoute.Login} className="header__nav-link">
              <span className="header__signout">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav>
  );

}

export default NavBar;

