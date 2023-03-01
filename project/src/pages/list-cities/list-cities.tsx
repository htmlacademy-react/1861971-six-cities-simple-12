import { memo } from 'react';
import { nanoid } from 'nanoid';
import { cities } from '../../types/const/const';

type indicatorNameCity = {
  valueCity: string;
}

function ListCities ({valueCity}: indicatorNameCity): JSX.Element {
  return (
    <>
      { cities.map((citie) =>
        (
          <li key={nanoid(3)} className="locations__item">
            <a className={citie === valueCity ?
              'locations__item-link tabs__item tabs__item--active' :
              'locations__item-link tabs__item'} href='#todo'
            >
              <span>{citie}</span>
            </a>
          </li>
        )
      )}
    </>
  );
}

export default memo(ListCities);
