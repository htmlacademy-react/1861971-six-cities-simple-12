import { combineReducers } from '@reduxjs/toolkit';
import { getOffers } from '../reducer/get-offers/get-offers';
import { getOffer } from '../reducer/get-offer/get-offer';
import { getOffersNear } from '../reducer/get-offers-near/get-offers-near';
import { getComments } from '../reducer/get-comments/get-comments';
import { getAuthorization } from '../reducer/get-authorization/get-authorization';
import { NameSpace } from '../../types/const/const';

export const rootReducer = combineReducers ({
  [NameSpace.Offers]: getOffers.reducer,
  [NameSpace.Offer]: getOffer.reducer,
  [NameSpace.OffersNear]: getOffersNear.reducer,
  [NameSpace.Comments]: getComments.reducer,
  [NameSpace.Authorization]: getAuthorization.reducer,
});
