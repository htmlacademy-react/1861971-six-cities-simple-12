import { memo } from 'react';
import { nanoid } from 'nanoid';
import { CITIES_NAME } from '../../types/const/const';

type CitiesListProps = {
  cityName: string;
}

function CitiesList ({cityName}: CitiesListProps): JSX.Element {
  return (
    <>
      { CITIES_NAME.map((city) =>
        (
          <li key={nanoid(3)} className="locations__item">
            <a className={city === cityName ?
              'locations__item-link tabs__item tabs__item--active' :
              'locations__item-link tabs__item'} href='#todo'
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
