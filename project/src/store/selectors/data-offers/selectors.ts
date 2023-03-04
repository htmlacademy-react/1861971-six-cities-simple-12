import { NameSpace } from '../../../types/const/const';
import { State } from '../../../types/store/store';
import { Offers } from '../../../types/const/const';

export const offers = (state: State): Offers => state[NameSpace.Offers].offerList;
export const loading = (state: State): boolean => state[NameSpace.Offers].loading;
