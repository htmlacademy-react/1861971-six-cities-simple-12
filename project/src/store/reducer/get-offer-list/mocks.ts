import { makeFakeOffer } from '../get-offer/mocks';
import { Offers, Offer } from '../../../types/const/const';

export const makeFakeOfferList = (): Offers => {

  const offerList: Offers = new Array(5).map((): Offer => makeFakeOffer);

  return offerList;
};
