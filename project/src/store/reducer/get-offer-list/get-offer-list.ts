import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferList } from '../../../types/store/store';
import { NameSpace, Offers } from '../../../types/const/const';

const initialState: OfferList = {
  offerList: []
};

export const getOfferList = createSlice({
  name: NameSpace.OfferList,
  initialState,
  reducers: {
    changeOfferList : (state, action: PayloadAction<Offers>) => {
      state.offerList = action.payload;
    }
  }
});

export const { changeOfferList } = getOfferList.actions;
