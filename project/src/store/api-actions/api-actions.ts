import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offers, Offer, Comments, APIRoute } from '../../types/const/const';

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
