import { NameSpace } from '../../../types/const/const';
import { State } from '../../../types/store/store';
import { Comments } from '../../../types/const/const';

export const comments = (state: State): Comments => state[NameSpace.Comments].comments;
export const loading = (state: State): boolean => state[NameSpace.Comments].loading;
