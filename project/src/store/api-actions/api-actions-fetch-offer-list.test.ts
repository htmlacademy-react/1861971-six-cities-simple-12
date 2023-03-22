import { createAPI } from '../../services/api/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/store/store';
import { Action } from 'redux';
import { makeFakeOfferList } from '../reducer/get-offer-list/mocks';
import { APIRoute } from '../../types/const/const';
import { fetchOfferList } from './api-actions';

describe('Async action for get a list of offers hosts', () => {
  const api = createAPI();
  const mockeAPI = new MockAdapter(api);

  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action >
  >(middlewares);

  const offerList = makeFakeOfferList();

  if('responds with a list of offers from hosts if 200', async () => {
    const store = mockStore();

    mockeAPI
    .onGet(APIRoute.OfferList)
    .reply(200, offerList);

    expect(store.getState()).toEqual({});
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferList());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferList.pending.type,
      fetchOfferList.fulfilled.type,
      fetchOfferList.rejected.type
    ]);

    const responseObject = store.getState().OFFERS?.offerList;
    expect(responseObject).toEqual(offerList)

  })

});
