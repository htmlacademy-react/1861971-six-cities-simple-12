import { MouseEvent } from 'react';
import OfferList from '../offer-list/offer-list';
import SortList from '../sort-list/sort-list';
import { Offers } from '../../types/const/const';

type IndicatorFilter = {
  nameCity: string;
  nameSort: string;
}

type ChangeSortHandler = (evt: MouseEvent) => void;
type SetOpenSortHandler = (value: boolean) => void;

type RentalOfferProps = {
  dataOffers: Offers;
  filterName: IndicatorFilter;
  changeSortHandler: ChangeSortHandler;
  openSortIndicator: boolean;
  setOpenSortHandler: SetOpenSortHandler;
}

function ThereIsRentalOffer ({dataOffers, filterName, changeSortHandler, openSortIndicator, setOpenSortHandler}: RentalOfferProps): JSX.Element {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{dataOffers.length} places to stay in {filterName.nameCity}</b>
        <form className="places__sorting" action="#" method="get" onMouseDown={() => setOpenSortHandler(!openSortIndicator)}>
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened" onMouseDown={changeSortHandler}>
            {openSortIndicator && <SortList valueSort={filterName.nameSort} closeHandler={setOpenSortHandler}/>}
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          <OfferList dataOffers={dataOffers}/>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>
  );
}

export default ThereIsRentalOffer;
