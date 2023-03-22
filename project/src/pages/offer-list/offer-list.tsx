import { useAppSelector, useAppDispatch } from '../../hooks/use-store/use-store';
import { loading } from '../../store/selectors/data-offers-near/selectors';
import { changeOfferList } from '../../store/reducer/get-offer-list/get-offer-list';
import { returnNewOffers } from '../../util/util';
import { Offers } from '../../types/const/const';
import OfferCard from './offer-card';

type ChangePlaceName = (index: number) => void;

type OfferListProps = {
  offersData?: Offers;
  dataOffersNear?: Offers | null | undefined;
  onChangePlaceName?: ChangePlaceName;
}

function OfferList({offersData, dataOffersNear, onChangePlaceName}: OfferListProps): JSX.Element {

  const loadingOffersNear = useAppSelector(loading);

  const dispatch = useAppDispatch();

  const newOfferList: Offers = returnNewOffers(offersData, dataOffersNear);
  dispatch(changeOfferList(newOfferList));

  return (
    <>
      {newOfferList.map((list) => (
        <OfferCard
          key={list.id.toString()}
          offer={list}
          onChangeCityName={onChangePlaceName}
        />
      ))}
      {loadingOffersNear && <b className="cities__status">...Loading offers nearby. Please wait.</b>}
      {newOfferList.length === 0 && <b className="cities__status">No offers found nearby.</b>}
    </>
  );
}

export default OfferList;
