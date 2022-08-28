
import { memo } from 'react';
import {Link, useParams} from 'react-router-dom';
import {CityList} from '../../const';


function CitiesList(): JSX.Element {

  const {city} = useParams();

  return (
    <>
      {Object.values(CityList).map((offeredCity, index) => {
        const keyValue = `${index}-${offeredCity}`;
        return (
          <li className="locations__item" key={keyValue}>
            <Link to={`/${offeredCity}`} className={offeredCity === city ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
              <span>{offeredCity}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default memo(CitiesList);

