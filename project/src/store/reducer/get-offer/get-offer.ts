import { createSlice } from '@reduxjs/toolkit';
import { fetchOffer } from '../../api-actions/api-actions';
import { DataOffer } from '../../../types/store/store';
import { NameSpace, TypeDownload } from '../../../types/const/const';

const initialState: DataOffer = {
  offer: null,
  typeDownload: 'pending'
};

export const getOffer = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    returnValueDefault : (state) => {
      state.typeDownload = TypeDownload.Pending;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.typeDownload = TypeDownload.Fulfilled;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.typeDownload = TypeDownload.Rejected;
      });
  }
});

export const { returnValueDefault } = getOffer.actions;
