import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferList } from '../api-actions/api-actions';
import { DataOffers } from '../../types/store/store';
import { NameSpace } from '../../types/const/const';

const initialState: DataOffers = {
  offerList: [],
  loading: false
};

export const getOffers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOfferList.fulfilled, (state, action) => {
        state.offerList = action.payload;
        state.loading = false;
      })
      .addCase(fetchOfferList.rejected, (state) => {
        state.loading = false;
      });
  }
});
