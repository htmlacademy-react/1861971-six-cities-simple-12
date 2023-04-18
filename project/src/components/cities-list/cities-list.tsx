import { Link } from 'react-router-dom';
import { memo } from 'react';
import { CITIES_NAMES, Path } from '../../types/const/const';

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
          <li key={city} className="locations__item">
            <Link className={city === cityName.cityName ?
              'locations__item-link tabs__item tabs__item--active' :
              'locations__item-link tabs__item'}
            to={Path.MainPath}
            onClick={() => onSetFilterStatus({
              ...cityName,
              cityName: city,
              sortType: 'Popular'
            })}
            >
              <span>{city}</span>
            </Link>
          </li>
        )
      )}
    </>
  );
}

export default memo(CitiesList);
