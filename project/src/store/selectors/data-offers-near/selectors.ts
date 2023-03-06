import { NameSpace } from '../../../types/const/const';
import { State } from '../../../types/store/store';
import { Offers } from '../../../types/const/const';

export const offersNear = (state: State): Offers | null => state[NameSpace.OffersNear].offersNear;
export const loading = (state: State): boolean => state[NameSpace.OffersNear].loading;
