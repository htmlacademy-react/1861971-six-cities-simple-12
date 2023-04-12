import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store/use-store';
import { loading } from '../../store/selectors/data-offers-near/selectors';
import { changeOfferList } from '../../store/reducer/get-offer-list/get-offer-list';
import { returnNewOffers } from '../../util/util';
import { Offers } from '../../types/const/const';
import OfferCard from './offer-card';

type ChangeIndexOffer = (index: number) => void;

type OfferListProps = {
  offersData?: Offers | undefined;
  dataOffersNear?: Offers | null | undefined;
  onGetIndexOffer?: ChangeIndexOffer;
}

function OfferList({offersData, dataOffersNear, onGetIndexOffer}: OfferListProps): JSX.Element {
  const [hostOfferData, setHostOfferData] = useState <Offers | undefined> (offersData);
  const loadingOffersNear = useAppSelector(loading);

  const dispatch = useAppDispatch();

  useEffect(() => {

    const newOfferList: Offers = returnNewOffers(offersData, dataOffersNear);
    setHostOfferData(newOfferList);
    dispatch(changeOfferList(newOfferList));

  },[offersData,dataOffersNear,dispatch]);

  return (
    <>
      {hostOfferData !== undefined && hostOfferData.map((list) => (
        <OfferCard
          key={list.id.toString()}
          offer={list}
          onGetIndexOffer={onGetIndexOffer}
        />
      ))}
      {loadingOffersNear && <b className="cities__status">...Loading offers nearby. Please wait.</b>}
      {(hostOfferData === undefined) && <b className="cities__status">No offers found nearby.</b>}
    </>
  );
}

export default OfferList;
