import { AxiosInstance } from 'axios';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useRequestServer } from '../../hooks/use-request-server/use-request-server';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { loading } from '../../store/selectors/data-offers-near/selectors';
import { offersNear } from '../../store/selectors/data-offers-near/selectors';
import { returnNewOffers } from '../../util/util';
import { Offers } from '../../types/const/const';
import OfferCard from './offer-card';

type FetchOfferNear = AsyncThunk<Offers, number, {
  extra: AxiosInstance;
}>;

type OfferListProps = {
  offersData?: Offers;
  requestData?: FetchOfferNear;
  hotelId?: number;
}

function OfferList({offersData, requestData, hotelId}: OfferListProps): JSX.Element {
  useRequestServer<FetchOfferNear | undefined, number>(requestData, hotelId);

  const loadingOffersNear = useAppSelector(loading);
  const dataOffersNear = useAppSelector(offersNear);

  const newOfferList: Offers = returnNewOffers(offersData, dataOffersNear);

  return (
    <>
      {newOfferList.map((list) => (
        <OfferCard key={list.id.toString()} offer={list}/>
      ))}
      {loadingOffersNear && <b className="cities__status">...Loading offers nearby. Please wait.</b>}
      {newOfferList.length === 0 && <b className="cities__status">No offers found nearby.</b>}
    </>
  );
}

export default OfferList;
