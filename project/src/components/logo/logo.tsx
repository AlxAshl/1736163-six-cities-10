import { Link, useParams } from 'react-router-dom';


function Logo(): JSX.Element {
  const {city} = useParams();
  return (
    <Link to={`/${city}`} className='header__logo-link'>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

export default Logo;
