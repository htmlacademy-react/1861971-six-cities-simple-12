import { createSlice } from '@reduxjs/toolkit';
import { fetchOffersNear } from '../../api-actions/api-actions';
import { DataOffersNear } from '../../../types/store/store';
import { NameSpace } from '../../../types/const/const';

const initialState: DataOffersNear = {
  offersNear: null,
  loading: false
};

export const getOffersNear = createSlice({
  name: NameSpace.OffersNear,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNear.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffersNear.fulfilled, (state, action) => {
        state.offersNear = action.payload;
        state.loading = false;
      })
      .addCase(fetchOffersNear.rejected, (state) => {
        state.loading = false;
      });
  }
});
