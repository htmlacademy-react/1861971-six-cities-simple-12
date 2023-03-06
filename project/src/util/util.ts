import { SORT_NAME, Offer, Offers, TypeHousing } from '../types/const/const';

export const sortOffersByCity = (offers:Offers, cityName:string):Offers =>
  offers.filter(
    (offer: Offer) => offer.city.name === cityName
  );

export const sortOffers = (sortType:string, offers:Offers) => {
  const [Popular, Tall, Short, Top] = SORT_NAME;
  let sortResult: Offers = [];

  switch (sortType) {
    case Popular:
      sortResult = offers;
      break;
    case Short:
      sortResult = offers.slice ().sort ((a,b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      break;
    case Tall:
      sortResult = offers.slice ().sort ((a,b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      }).reverse();
      break;
    case Top:
      sortResult = offers.slice ().sort ((a,b) => {
        if (a.rating < b.rating) {
          return -1;
        }
        if (a.rating > b.rating) {
          return 1;
        }
        return 0;
      }).reverse();
      break;
  }
  return sortResult;
};

export const returnTypeHousing = ( typeHousing: string ) => {
  const { Apartment, Room, House, Hotel } = TypeHousing;

  switch (typeHousing) {
    case 'apartment':
      return Apartment;
    case 'room':
      return Room;
    case 'house':
      return House;
    case 'hotel':
      return Hotel;
    default:
      return '';
  }
};

export const returnNewOffers = (offersData: Offers | undefined, dataOffersNear: Offers | null): Offers => {
  let newOffers: Offers = [];

  if(offersData) {
    newOffers = offersData.slice(0, 5);
  }

  if(dataOffersNear) {
    newOffers = dataOffersNear.slice(0, 3);
  }
  return newOffers;
};
