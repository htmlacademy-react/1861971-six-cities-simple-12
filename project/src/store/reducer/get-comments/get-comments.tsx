import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchComments } from '../../api-actions/api-actions';
import { DataComments } from '../../../types/store/store';
import { NameSpace, Comments } from '../../../types/const/const';

const initialState: DataComments = {
  comments: [],
  loading: false
};

export const getComments = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    addComments: (state, action: PayloadAction<Comments>) => {
      state.comments = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const {addComments} = getComments.actions;
