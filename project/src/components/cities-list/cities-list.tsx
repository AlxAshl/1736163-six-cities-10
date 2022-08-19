
import {Link} from 'react-router-dom';
import {MouseEvent} from 'react';
import {citySelector} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Cities} from '../../const';

function CitiesList(): JSX.Element | any {

  const currentCity = useAppSelector((state) => state.currentCity);

  const dispatch = useAppDispatch();
  return (
    Object.values(Cities).map((offeredCity, index) => {
      const keyValue = `${index}-${offeredCity}`;
      return (
        <li className="locations__item" key={keyValue}>
          <Link to={`/${offeredCity}`} className={offeredCity === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} onClick={({ target }: MouseEvent<HTMLAnchorElement>) => {
            const value = offeredCity;
            dispatch(citySelector(value));
          }}
          >
            <span>{offeredCity}</span>
          </Link>
        </li>
      );
    })
  );
}

export default CitiesList;

