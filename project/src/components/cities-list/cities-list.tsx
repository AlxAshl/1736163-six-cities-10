import {City} from '../../types/cities';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {MouseEvent} from 'react';
import {citySelector} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';

type CitiesListProps = {
  cities: City;
}

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const {city} = cities;
  const currentCity = useAppSelector((state) => state.currentCity);
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list" >
      {city.map((offeredCity, index) => {
        const keyValue = `${index}-${offeredCity}`;
        return (
          <li className="locations__item" key={keyValue} onClick= {({target}:MouseEvent<HTMLLIElement>) => {
            const value = offeredCity;
            dispatch(citySelector(value));
          }}
          >
            <Link to={AppRoute.Root} className={offeredCity === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
              <span>{offeredCity}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
