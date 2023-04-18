import { makeFakeOffer } from './mocks';
import { fetchOffer } from '../../api-actions/api-actions';
import {
  getOffer,
  returnValueDefault
} from './get-offer';
import { DataOffer } from '../../../types/store/store';
import { TypeDownload } from '../../../types/const/const';

describe('Reducer offer', () => {

  describe('loading offer',() => {
    let firstState: DataOffer;

    beforeEach(() => {
      firstState = {
        offer: null,
        typeDownload: 'pending'
      };
    });

    test(`should update typeDownload to "fulfilled"
    and in offer add offer host if fetchOffer is fulfilled`,
    () => {
      expect(getOffer.reducer(firstState, {type: fetchOffer.fulfilled.type, payload: makeFakeOffer}))
        .toEqual({
          ...firstState,
          offer:makeFakeOffer,
          typeDownload: TypeDownload.Fulfilled
        });
    });

    test('should update typeDownload to "rejected" if fetchOffer is rejected',
      () => {
        expect(getOffer.reducer(firstState, {type: fetchOffer.rejected.type}))
          .toEqual({
            ...firstState,
            typeDownload: TypeDownload.Rejected
          });
      });
  });

  describe('return default value', () => {
    let secondState: DataOffer;

    beforeEach(() => {
      secondState = {
        offer: null,
        typeDownload: 'fulfilled'
      };
    });

    test(`return value typeDownload to "pending"
    when calling a function "returnValueDefault"`, () => {
      expect(getOffer.reducer(secondState, returnValueDefault()))
        .toEqual({
          ...secondState,
          typeDownload: TypeDownload.Pending
        });
    });
  });
});
