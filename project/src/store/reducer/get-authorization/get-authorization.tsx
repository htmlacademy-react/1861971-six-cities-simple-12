import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorizationOnServer } from '../../api-actions/api-actions';
import { AuthorizationType } from '../../../types/store/store';
import { NameSpace, AuthorizationStatus, Authorization } from '../../../types/const/const';

const initialState: AuthorizationType = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  dataUser: null
};

export const getAuthorization = createSlice({
  name: NameSpace.Authorization,
  initialState,
  reducers: {
    changeAuthorizationStatus : (state, action: PayloadAction<Authorization>) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.dataUser = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(authorizationOnServer.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.dataUser = action.payload;
      });
  }
});

export const { changeAuthorizationStatus } = getAuthorization.actions;
