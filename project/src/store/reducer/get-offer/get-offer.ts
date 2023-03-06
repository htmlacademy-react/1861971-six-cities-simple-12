import { createSlice } from '@reduxjs/toolkit';
import { fetchOffer } from '../../api-actions/api-actions';
import { DataOffer } from '../../../types/store/store';
import { NameSpace } from '../../../types/const/const';

const initialState: DataOffer = {
  offer: null
};

export const getOffer = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
      });
  }
});
