import { NameSpace } from '../../../types/const/const';
import { State } from '../../../types/store/store';
import { Authorization } from '../../../types/const/const';

export const auth = (state: State): string => state[NameSpace.Authorization].authorizationStatus;
export const userData = (state: State): Authorization | null => state[NameSpace.Authorization].dataUser;
