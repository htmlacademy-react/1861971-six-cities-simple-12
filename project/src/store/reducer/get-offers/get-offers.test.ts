import { getOffers } from './get-offers';
import { fetchOfferList } from '../../api-actions/api-actions';
import { makeFakeOfferList } from '../get-offer-list/mocks';
import { DataOffers } from '../../../types/store/store';

describe('Reducer get offers from host', () => {
  let state: DataOffers;

  beforeEach(() => {
    state = {
      offerList: [],
      loading: false
    };
  });

  const offers = makeFakeOfferList();

  test('should update loading to "true" if fetchOfferList is pending', () => {
    expect(getOffers.reducer(state, {type: fetchOfferList.pending.type}))
      .toEqual({
        ...state,
        loading: true
      });
  });

  test(`loading dosen't change if fetchOfferList is fulfilled, and
    in offerList add offers host`, () => {
    expect(getOffers.reducer(state, {type: fetchOfferList.fulfilled.type, payload: offers}))
      .toEqual({
        ...state,
        offerList: offers
      });
  });

  test('loading and offerList dont\'t change if fetchOfferList is rejected', () => {
    expect(getOffers.reducer(state, {type: fetchOfferList.rejected.type}))
      .toEqual({
        ...state
      });
  });
});
