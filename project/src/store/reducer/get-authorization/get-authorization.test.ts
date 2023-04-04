import { getAuthorization } from './get-authorization';
import { changeAuthorizationStatus } from './get-authorization';
import {
  authorizationOnServer,
  requestEndUserSession
} from '../../api-actions/api-actions';
import { makeFakeUserData } from './mocks';
import { AuthorizationStatus } from '../../../types/const/const';
import { AuthorizationType } from '../../../types/store/store';


describe('Reducer: user', () => {
  let state: AuthorizationType;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      dataUser: null
    };
  });

  const dataUser = makeFakeUserData();

  describe('loginAction test', () => {

    test(
      `should update authorizationStatus to "AUTH" if authorizationOnServer fulfilled and
  get an object with user data`,

      () => {
        expect(getAuthorization.reducer(
          state, {type: authorizationOnServer.fulfilled.type, payload: dataUser}
        ))
          .toEqual({
            ...state,
            authorizationStatus: AuthorizationStatus.Auth,
            dataUser
          });
      });

    test(
      'should update authorizationStatus to "NO_AUTH" if authorizationOnServer rejected',
      () => {
        expect(getAuthorization.reducer(
          state, {type: authorizationOnServer.rejected.type}
        ))
          .toEqual({
            ...state
          });
      });

    describe('checkAuthorizationUser test', () => {

      test(
        `should update authorizationStatus to "AUTH" if checkAuthorizationUser fulfilled and
        get an object with user data`,

        () => {
          expect(getAuthorization.reducer(
            state, changeAuthorizationStatus(dataUser)
          ))
            .toEqual({
              ...state,
              authorizationStatus: AuthorizationStatus.Auth,
              dataUser: dataUser
            });
        });
    });

  });

  describe('requestEndUserSession test', () => {

    test(
      `should update authorizationStatus to "NoAuth" if requestEndUserSession fulfilled and
  get an object with null`,

      () => {
        expect(getAuthorization.reducer(
          state, {type: requestEndUserSession.fulfilled.type}
        ))
          .toEqual({
            ...state,
            authorizationStatus: AuthorizationStatus.NoAuth,
            dataUser: null
          });
      });

  });
});
