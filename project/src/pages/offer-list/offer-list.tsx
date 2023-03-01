import OfferCard from './offer-card';
import { Offers } from '../../types/const/const';


type DataOfferList = {
  dataOffers: Offers;
}

function OfferList({dataOffers}: DataOfferList): JSX.Element {

  const newOfferList: Offers = dataOffers.slice(0, 5);

  return (
    <>
      {newOfferList.map((list) => (
        <OfferCard key={list.id.toString()} dataOffer={list}/>
      ))}
    </>
  );
}

export default OfferList;
