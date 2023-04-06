import { createAPI } from '../../services/api/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/store/store';
import { Action } from 'redux';
import { APIRoute } from '../../types/const/const';
import {
  fetchOfferList,
  fetchOffer,
  fetchOffersNear,
  authorizationOnServer,
  checkAuthorizationUser,
  postCommentOnServer,
  requestEndUserSession
} from './api-actions';

describe('Async action', () => {
  const api = createAPI();
  const mockeAPI = new MockAdapter(api);

  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action >
  >(middlewares);

  const offerList = [{}, {}, {}];
  const offer = {};
  const mockUserData = {
    avatarUrl: 'img/1.png',
    email: 'Oliver.conner@gmail.com',
    id: 1,
    isPro: false,
    name: 'Oliver.conner',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  };
  it('responds with a list of offers from hosts if response 200', async () => {

    const store = mockStore();

    mockeAPI
      .onGet(APIRoute.OfferList)
      .reply(200, offerList);

    expect(store.getActions()).toEqual([]);

    const data = await store.dispatch(fetchOfferList());

    const actions = store.getActions();
    expect(actions[1].type).toEqual(fetchOfferList.fulfilled.type);

    expect(data.payload).toEqual(offerList);

  });

  it('responds with a offer from hosts if response 200', async () => {
    const store = mockStore();

    mockeAPI
      .onGet(`${APIRoute.OfferList}/${4}`)
      .reply(200, offer);

    expect(store.getActions()).toEqual([]);

    const data = await store.dispatch(fetchOffer(4));

    const actions = store.getActions();
    expect(actions[1].type).toEqual(fetchOffer.fulfilled.type);

    expect(data.payload).toEqual(offer);

  });

  it('responds with a list of offers nearby from hosts if response 200', async () => {

    const store = mockStore();

    mockeAPI
      .onGet(`${APIRoute.OfferList}/${4}/${APIRoute.OfferNear}`)
      .reply(200, offerList);

    expect(store.getActions()).toEqual([]);

    const data = await store.dispatch(fetchOffersNear(4));

    const actions = store.getActions();
    expect(actions[1].type).toEqual(fetchOffersNear.fulfilled.type);

    expect(data.payload).toEqual(offerList);

  });

  it('responds with an authorization object with token if response 200', async () => {
    const mockAuthorizationData = {
      email: 'Oliver.conner@gmail.com',
      password: '12345678'
    };

    const store = mockStore();

    mockeAPI
      .onPost(APIRoute.Login)
      .reply(200, mockUserData);

    expect(store.getActions()).toEqual([]);

    Storage.prototype.setItem = jest.fn();

    const data = await store.dispatch(authorizationOnServer(mockAuthorizationData));

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('reviews-form-token', 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=');

    expect(data.payload).toEqual(mockUserData);

    const actions = store.getActions();
    expect(actions[1].type).toEqual(authorizationOnServer.fulfilled.type);

  });

  it('responds with an authorization object if response 200', async () => {
    const store = mockStore();

    mockeAPI
      .onGet(APIRoute.Login)
      .reply(200, mockUserData);

    expect(store.getActions()).toEqual([]);

    const data = await store.dispatch(checkAuthorizationUser());

    expect(data.payload).toEqual(mockUserData);

  });

  it('responds with an comment object or comments  if response 200', async () => {
    const newComment = {
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      rating: 4,
      id: 4
    };

    const store = mockStore();

    mockeAPI
      .onPost(`${APIRoute.Comments}/${newComment.id}`)
      .reply(200, offerList);

    expect(store.getActions()).toEqual([]);

    const data = await store.dispatch(postCommentOnServer(newComment));

    expect(data.payload).toEqual(offerList);

  });

  it('deleting a token and exit from the closed part of the application', async () => {
    const store = mockStore();

    mockeAPI
      .onDelete(APIRoute.Delete)
      .reply(204);

    expect(store.getActions()).toEqual([]);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(requestEndUserSession());

    const actions = store.getActions();
    expect(actions[1].type).toEqual(requestEndUserSession.fulfilled.type);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('reviews-form-token');

  });

});
