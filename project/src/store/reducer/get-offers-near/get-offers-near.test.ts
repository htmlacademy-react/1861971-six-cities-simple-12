import { getOffersNear } from './get-offers-near';
import { fetchOffersNear } from '../../api-actions/api-actions';
import { makeFakeOfferList } from '../get-offer-list/mocks';
import { DataOffersNear } from '../../../types/store/store';

describe('Reducer get offers near from host', () => {
  let state: DataOffersNear;

  beforeEach(() => {
    state = {
      offersNear: null,
      loading: false
    };
  });

  const offersNear = makeFakeOfferList();

  test('should update loading to "true" if fetchOffersNear is pending',
    () => {
      expect(getOffersNear.reducer(state, {type: fetchOffersNear.pending.type}))
        .toEqual({
          ...state,
          loading: true
        });
    });

  test(`loading dosen't change if fetchOffersNear is fulfilled, and
    in offersNear add offers near host`, () => {
    expect(getOffersNear.reducer(state, {type: fetchOffersNear.fulfilled.type, payload: offersNear}))
      .toEqual({
        ...state,
        offersNear: offersNear
      });
  });

  test('loading and offersNear dont\'t change if fetchOffersNear is rejected',
    () => {
      expect(getOffersNear.reducer(state, {type: fetchOffersNear.rejected.type}))
        .toEqual({
          ...state
        });
    });
});

