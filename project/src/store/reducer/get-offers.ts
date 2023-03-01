import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferList } from '../api-actions/api-actions';
import { DataOffers } from '../../types/store/store';
import { NameSpace } from '../../types/const/const';

const initialState: DataOffers = {
  offerList: []
};

export const getOffers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferList.fulfilled, (state, action) => {
        state.offerList = action.payload;
      });
  }
});
