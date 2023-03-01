import { useState, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from './../../hooks/use-store/use-store';
import { fetchOfferList } from '../../store/api-actions/api-actions';
import { offers } from '../../store/selectors/data-offers/selectors';
import HeaderPage from '../../pages/header-page/header-page';
import ListCities from '../../pages/list-cities/list-cities';
import ThereIsRentalOffer from '../../pages/there-is-rental-offer/there-is-rental-offer';
import NoRentalOffers from '../../pages/no-rental-offers/no-rental-offers';
import { sortOffersByCity, sortOffers } from '../../util/util';
import { Offers } from '../../types/const/const';

function MainPage (): JSX.Element {
  const [ indicatorFetch, setIndicatorFetch ] = useState(false);
  const [ indicatorFilter, setIndicatorFilter ] = useState({
    nameCity: 'Paris',
    nameSort: 'Popular',
  });
  const [ openSort, setOpenSort ] = useState(false);
  const dispatch = useAppDispatch();


  if(indicatorFetch === false) {
    dispatch(fetchOfferList());
    setIndicatorFetch(true);
  }

  const changeNameCity = (evt: MouseEvent) => {
    setIndicatorFilter({
      ...indicatorFilter,
      nameCity: evt.target.textContent
    });
  };

  const changeSort = (evt: MouseEvent) => {
    setIndicatorFilter({
      ...indicatorFilter,
      nameSort: evt.target.textContent
    });
  };

  const offerList = useAppSelector(offers);

  const offerSortCity: Offers = sortOffersByCity(offerList, indicatorFilter.nameCity);
  const offerSortFilter: Offers = sortOffers(indicatorFilter.nameSort, offerSortCity);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href='#todo'>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <HeaderPage/>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list" onMouseDown={changeNameCity}>
              <ListCities valueCity={indicatorFilter.nameCity}/>
            </ul>
          </section>
        </div>
        <div className="cities">
          { offerSortFilter.length !== 0 ?
            <ThereIsRentalOffer
              dataOffers={offerSortFilter}
              filterName={indicatorFilter}
              changeSortHandler={changeSort}
              openSortIndicator={openSort}
              setOpenSortHandler={setOpenSort}
            /> :
            <NoRentalOffers/>}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
