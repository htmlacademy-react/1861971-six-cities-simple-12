import { MouseEvent, useState } from 'react';
import OfferList from '../offer-list/offer-list';
import SortList from '../sort-list/sort-list';
import { Offers } from '../../types/const/const';

type filterType = {
  cityName: string;
  sortType: string;
}

type changeSort = (evt: MouseEvent) => void;

type RentalOfferProps = {
  offers: Offers;
  filterName: filterType;
  onChangeSort: changeSort;
}

function RentalOffer ({offers, filterName, onChangeSort}: RentalOfferProps): JSX.Element {
  const [ openSort, setOpenSort ] = useState(false);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {filterName.cityName}</b>
        <form className="places__sorting" action="#" method="get" onMouseDown={() => setOpenSort(!openSort)}>
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened" onMouseDown={onChangeSort}>
            {openSort && <SortList sortName={filterName.sortType} onSetOpenSort={setOpenSort}/>}
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          <OfferList offersData={offers}/>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>
  );
}

export default RentalOffer;
