import { NameSpace } from '../../../types/const/const';
import { State } from '../../../types/store/store';
import { Offers } from '../../../types/const/const';

export const dataOffers = (state: State): Offers => state[NameSpace.OfferList].offerList;
