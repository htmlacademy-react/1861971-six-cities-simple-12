import { useLocation } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { fetchOfferList } from '../../store/api-actions/api-actions';
import { offers } from '../../store/selectors/data-offers/selectors';
import { useRequestServer } from '../../hooks/use-request-server/use-request-server';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import RentalOffer from '../../components/rental-offer/rental-offer';
import NoRentalOffers from '../../components/no-rental-offers/no-rental-offers';
import { sortOffersByCity, sortOffers } from '../../util/util';
import { Offers } from '../../types/const/const';

type FetchOfferList = AsyncThunk<Offers, undefined, {
  extra: AxiosInstance;
}>;

type nameCity = {
  nameCity: string;
}

type State = {
    state: nameCity;
  };


function MainPage (): JSX.Element {
  const { state }: State = useLocation();
  const [ filterStatus, setFilterStatus ] = useState({
    cityName: 'Paris',
    sortType: 'Popular',
  });
  /*
  if(state !== null && state !== filterStatus.cityName) {
    setFilterStatus({
      ...filterStatus,
      cityName: state
    });
  }
*/
  useRequestServer<FetchOfferList, null>(fetchOfferList);

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
              <Header/>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <CitiesList cityName={filterStatus} onSetFilterStatus={setFilterStatus}/>
            </ul>
          </section>
        </div>
        <div className="cities">
          { offerSortFilter.length !== 0 ?
            <RentalOffer
              offers={offerSortFilter}
              filterName={filterStatus}
              onChangeSort={setFilterStatus}
              nameSort={filterStatus.sortType}
            /> :
            <NoRentalOffers city={filterStatus.cityName}/>}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
