import { useState, MouseEvent } from 'react';
import { useAppSelector } from './../../hooks/use-store/use-store';
import { fetchOfferList } from '../../store/api-actions/api-actions';
import { offers } from '../../store/selectors/data-offers/selectors';
import { useRequestServer } from '../../hooks/use-request-server/use-request-server';
import HeaderPage from '../../pages/header-page/header-page';
import CitiesList from '../../pages/cities-list/cities-list';
import RentalOffer from '../../pages/rental-offer/rental-offer';
import NoRentalOffers from '../../pages/no-rental-offers/no-rental-offers';
import { sortOffersByCity, sortOffers } from '../../util/util';
import { Offers } from '../../types/const/const';

function MainPage (): JSX.Element {
  const [ filterStatus, setFilterStatus ] = useState({
    cityName: 'Paris',
    sortType: 'Popular',
  });

  useRequestServer(fetchOfferList);

  const changeCityName = (evt: MouseEvent) => {
    setFilterStatus({
      ...filterStatus,
      cityName: evt.target.textContent,
      sortType: 'Popular'
    });
  };

  const changeSort = (evt: MouseEvent) => {
    setFilterStatus({
      ...filterStatus,
      sortType: evt.target.textContent
    });
  };

  const offersList = useAppSelector(offers);

  const offerSortCity: Offers = sortOffersByCity(offersList, filterStatus.cityName);
  const offerSortFilter: Offers = sortOffers(filterStatus.sortType, offerSortCity);

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
            <ul className="locations__list tabs__list" onMouseDown={changeCityName}>
              <CitiesList cityName={filterStatus.cityName}/>
            </ul>
          </section>
        </div>
        <div className="cities">
          { offerSortFilter.length !== 0 ?
            <RentalOffer
              offers={offerSortFilter}
              filterName={filterStatus}
              onChangeSort={changeSort}
            /> :
            <NoRentalOffers/>}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
