import { Offers } from '../types/const/const';
import { Offer } from '../types/const/const';
import { nameSort } from '../types/const/const';

export const sortOffersByCity = (dataOffers:Offers, cityIndicator:string):Offers =>
  dataOffers.filter(
    (offer: Offer) => offer.city.name === cityIndicator
  );

export const sortOffers = (indicatorSort:string, dataOffers:Offers) => {
  const [Popular, Tall, Short, Top] = nameSort;
  let sortResult: Offers = [];

  switch (indicatorSort) {
    case Popular:
      sortResult = dataOffers;
      break;
    case Short:
      sortResult = dataOffers.slice ().sort ((a,b) => {
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
      sortResult = dataOffers.slice ().sort ((a,b) => {
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
      sortResult = dataOffers.slice ().sort ((a,b) => {
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

