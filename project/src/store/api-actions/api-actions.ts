import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch } from '../../types/reducer/reducer';
import { saveToken, dropToken } from '../../services/save-token/save-token';
import { changeAuthorizationStatus } from '../reducer/get-authorization/get-authorization';
import { addComments } from '../reducer/get-comments/get-comments';
import {
  Offers,
  Offer,
  Comments,
  APIRoute,
  Authorization,
  DataUser,
  UserComment
} from '../../types/const/const';

export const fetchOfferList = createAsyncThunk<Offers, undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchOfferList',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.OfferList);
    return data;
  },
);

export const fetchOffer = createAsyncThunk<Offer, number, {
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (hotelId: number, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.OfferList}/${hotelId}`);
    return data;
  },
);

export const fetchOffersNear = createAsyncThunk<Offers, number, {
  extra: AxiosInstance;
}>(
  'data/fetchOffersNear',
  async (hotelId: number, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.OfferList}/${hotelId}/${APIRoute.OfferNear}`);
    return data;
  },
);

export const fetchComments = createAsyncThunk<Comments, number, {
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (hotelId: number, {extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${hotelId}`);
    return data;
  },
);

export const authorizationOnServer = createAsyncThunk<Authorization, DataUser, {
  extra: AxiosInstance;
}>(
  'user/authorizationOnServer',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<Authorization>(APIRoute.Login, {email, password});
    const tokenUser = data.token;
    saveToken(tokenUser);
    return data;
  },
);

export const checkAuthorizationUser = createAsyncThunk<void, undefined, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'user/checkAuthorization',
  async (_arg, {dispatch ,extra: api}) => {
    const {data} = await api.get<Authorization>(APIRoute.Login);
    dispatch(changeAuthorizationStatus(data));
  },
);

export const postCommentOnServer = createAsyncThunk<void, UserComment, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'user/postCommentOnServer',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    const {data} = await api.post<Comments>(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(addComments(data));
  },
);

export const requestEndUserSession = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/endUserSession',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Delete);
    dropToken();
  },
);
