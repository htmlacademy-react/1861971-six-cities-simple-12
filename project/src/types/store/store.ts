import { store } from '../../store/store/store';
import { Offers, Offer, Comments } from '../const/const';

export type DataOffers = {
  offerList: Offers;
  loading: boolean;
};

export type DataOffer = {
offer: Offer | null;
};

export type DataOffersNear = {
  offersNear: Offers | null;
  loading: boolean;
};

export type DataComments = {
  comments: Comments;
  loading: boolean;
};

export type State = ReturnType<typeof store.getState>;
