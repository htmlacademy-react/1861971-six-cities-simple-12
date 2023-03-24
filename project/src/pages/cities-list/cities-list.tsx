import { memo } from 'react';
import { nanoid } from 'nanoid';
import { CITIES_NAMES } from '../../types/const/const';

type SetFilterStatus = React.Dispatch<React.SetStateAction<{
  cityName: string;
  sortType: string;
}>>

type FilterStatus = {
  cityName: string;
  sortType: string;
}

type CitiesListProps = {
  cityName: FilterStatus;
  onSetFilterStatus: SetFilterStatus;
}

function CitiesList ({cityName, onSetFilterStatus}: CitiesListProps): JSX.Element {
  return (
    <>
      { CITIES_NAMES.map((city) =>
        (
          <li key={nanoid(3)} className="locations__item">
            <a className={city === cityName.cityName ?
              'locations__item-link tabs__item tabs__item--active' :
              'locations__item-link tabs__item'}
            href='#todo'
            onClick={() => onSetFilterStatus({
              ...cityName,
              cityName: city,
              sortType: 'Popular'
            })}
            >
              <span>{city}</span>
            </a>
          </li>
        )
      )}
    </>
  );
}

export default memo(CitiesList);
