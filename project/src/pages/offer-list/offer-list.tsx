import OfferCard from './offer-card';
import { Offers } from '../../types/const/const';


type OfferListProps = {
  offersData: Offers;
}

function OfferList({offersData}: OfferListProps): JSX.Element {

  const newOfferList: Offers = offersData.slice(0, 5);

  return (
    <>
      {newOfferList.map((list) => (
        <OfferCard key={list.id.toString()} offer={list}/>
      ))}
    </>
  );
}

export default OfferList;
