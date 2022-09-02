import { memo, useRef, useState } from 'react';
import { MouseEvent } from 'react';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { getOffers, getUnsortOffers } from '../../store/data-process/selectors';
import { getSortingType } from '../../store/utility-process/selectors';
import { sortSelector } from '../../store/utility-process/utility-process';
import { sortOffers } from './sort-offers';


function SortingList(): JSX.Element {

  const unsortedOffers = useAppSelector(getUnsortOffers);
  const [isActive, setActive] = useState(false);
  const ref = useRef(null);
  const sortingType = useAppSelector(getSortingType);
  const serverOffers = useAppSelector(getOffers);
  const handleSortSelectClick = (evt: MouseEvent<HTMLLIElement>) => {
    setActive((current) => !current);
    const currentSort = evt.currentTarget.getAttribute('data-tag');
    if(currentSort !== null){
      store.dispatch(sortSelector(currentSort));
      sortOffers(currentSort, serverOffers, unsortedOffers);
    }
  };

  const handleSortClick = () => {
    setActive(false);
    window.removeEventListener('click', handleSortClick );
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span ref={ref} className={isActive ? 'places__sorting-type' : 'places__sorting-type' } tabIndex={0} onClick ={
        (e) => {e.stopPropagation();
          setActive((current) => !current);
          window.addEventListener('click', handleSortClick );}
      }
      >
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={isActive ? 'places__options places__options--custom places__options--opened' : 'places__options places__options--custom places__options--closed'}>
        <li className="places__option" data-tag={'Popular'} tabIndex={0} onClick ={handleSortSelectClick}>Popular</li>
        <li className="places__option" data-tag={'Price: low to high'} tabIndex={0} onClick ={handleSortSelectClick}>Price: low to high</li>
        <li className="places__option" data-tag={'Price: high to low'} tabIndex={0} onClick ={handleSortSelectClick}>Price: high to low</li>
        <li className="places__option" data-tag={'Top rated first'} tabIndex={0} onClick ={handleSortSelectClick}>Top rated first</li>
      </ul>
    </form>
  );
}
export default memo(SortingList);
