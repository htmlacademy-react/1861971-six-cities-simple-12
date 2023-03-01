import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { State } from '../../types/store/store';
import { Dispatch } from '../../types/reducer/reducer';

export const useAppDispatch: () => Dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
