import { createSlice } from '@reduxjs/toolkit';
import { postCommentOnServer } from '../../api-actions/api-actions';
import { AddUserComment } from '../../../types/store/store';
import { NameSpace } from '../../../types/const/const';

const initialState: AddUserComment = {
  loading: {
    type: '',
    status: true
  }
};

export const addUserComment = createSlice({
  name: NameSpace.AddComments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postCommentOnServer.pending, (state) => {
        state.loading = {
          type: 'pending',
          status: true
        };
      })
      .addCase(postCommentOnServer.fulfilled, (state, action) => {
        state.loading = {
          type: 'fulfilled',
          status: false
        };
      })
      .addCase(postCommentOnServer.rejected, (state) => {
        state.loading = {
          type: 'rejected',
          status: false
        };
      });
  }
});
