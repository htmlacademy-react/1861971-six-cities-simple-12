import { NameSpace } from '../../../types/const/const';
import { State } from '../../../types/store/store';

export const load = (state: State) => state[NameSpace.AddComments].loading;
