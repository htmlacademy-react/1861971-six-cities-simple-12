import { AxiosInstance } from 'axios';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store/use-store';
import { useRequestServer } from '../../hooks/use-request-server/use-request-server';
import { fetchOffer } from '../../store/api-actions/api-actions';
import { returnValueDefault } from '../../store/reducer/get-offer/get-offer';
import { offer, download } from '../../store/selectors/data-offer/selectors';
import { Offer, TypeDownload, Path } from '../../types/const/const';
import OfferPage from '../../components/offer-page/offer-page';

type FetchOffer = AsyncThunk<Offer, number, {
  extra: AxiosInstance;
}>;

function LoadOffer (): JSX.Element {
  const hotelId = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useRequestServer<FetchOffer, number>(fetchOffer, Number(hotelId.id));
  const dataOffer = useAppSelector(offer);
  const typeDowload = useAppSelector(download);

  useEffect(() => {
    if(typeDowload === TypeDownload.Pendin){
      return;
    }

    let isMounted = true;

    if(isMounted && !dataOffer && typeDowload === TypeDownload.Fulfilled){
      navigate(Path.MainPath);
      dispatch(returnValueDefault());
    }

    if(isMounted && typeDowload === TypeDownload.Rejected){
      navigate(Path.MainPath);
      dispatch(returnValueDefault());
    }

    return () => {
      isMounted = false;
    };
  },[dataOffer, typeDowload, navigate, dispatch]);

  return (
    <div className="page">
      {(!dataOffer &&
      <>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                <div className="property__image-wrapper">
                  <img className="property__image" src="img/room.jpg" alt=""/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="img/apartment-01.jpg" alt=""/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="img/apartment-02.jpg" alt=""/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="img/apartment-03.jpg" alt=""/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="img/studio-01.jpg" alt=""/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="img/apartment-01.jpg" alt=""/>
                </div>
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                ...Loading offer. Please wait.
                  </h1>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>) || (dataOffer && <OfferPage dataOffer={dataOffer}/> ) }
    </div>
  );
}

export default LoadOffer;
