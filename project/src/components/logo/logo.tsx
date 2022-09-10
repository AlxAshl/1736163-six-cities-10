import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { store } from '../../store';
import { fetchOfferAction } from '../../store/api-actions';


function Logo(): JSX.Element {
  const handleLogoClick = () => {
    store.dispatch(fetchOfferAction());
  };
  return (
    <Link to={AppRoute.Root} className='header__logo-link' onClick ={handleLogoClick}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

export default memo(Logo);
