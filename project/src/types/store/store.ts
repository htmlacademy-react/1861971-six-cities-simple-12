import { store } from '../../store/store/store';
import { Offers } from '../const/const';

export type DataOffers = {
  offerList: Offers;
  loading: boolean;
};

export type State = ReturnType<typeof store.getState>;
