import { NameSpace } from '../../../types/const/const';
import { State } from '../../../types/store/store';
import { Offer } from '../../../types/const/const';

export const offer = (state: State): Offer | null => state[NameSpace.Offer].offer;
