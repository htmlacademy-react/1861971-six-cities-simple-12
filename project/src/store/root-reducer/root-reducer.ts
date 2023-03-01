import { combineReducers } from '@reduxjs/toolkit';
import { getOffers } from '../reducer/get-offers';
import { NameSpace } from '../../types/const/const';

export const rootReducer = combineReducers ({
  [NameSpace.Offers]: getOffers.reducer
});
