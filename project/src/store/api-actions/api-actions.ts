import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offers, APIRoute } from '../../types/const/const';

export const fetchOfferList = createAsyncThunk<Offers, undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchOfferList',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.OfferList);
    return data;
  },
);
