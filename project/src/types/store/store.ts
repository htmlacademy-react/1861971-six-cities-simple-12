import { store } from '../../store/store/store';
import { Offers, Offer, Comments, Authorization } from '../const/const';

export type DataOffers = {
  offerList: Offers;
  loading: boolean;
};

export type DataOffer = {
offer: Offer | null;
typeDownload: string;
};

export type DataOffersNear = {
  offersNear: Offers | null;
  loading: boolean;
};

export type DataComments = {
  comments: Comments;
  loading: boolean;
};

export type AuthorizationType = {
  authorizationStatus: string;
  dataUser: Authorization | null;
};

export type AddUserComment = {
  loading: {
    type: string;
    status: boolean;
  };
}

export type State = ReturnType<typeof store.getState>;
