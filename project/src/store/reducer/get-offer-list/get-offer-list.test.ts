import {
  changeOfferList,
  getOfferList
} from './get-offer-list';
import { makeFakeOfferList } from './mocks';
import { OfferList } from '../../../types/store/store';

describe('Reducer for drawing on the map', () => {
  let state: OfferList;

  beforeEach(() => {
    state = {
      offerList: []
    };
  });

  const offerList = makeFakeOfferList();

  test(`when calling the function "changeOfferList" in
  "offerList" add offer list`,
  () => {
    expect(getOfferList.reducer(state, changeOfferList( offerList )))
      .toEqual({
        ...state,
        offerList: offerList
      });
  });
});
