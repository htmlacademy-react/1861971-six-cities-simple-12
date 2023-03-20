import {
  getComments,
  addComments
} from './get-comments';
import { fetchComments } from '../../api-actions/api-actions';
import { makeFakeUserComments } from './mocks';
import { DataComments } from '../../../types/store/store';


describe('Reducer userComments', () => {
  let state: DataComments;

  beforeEach(() => {
    state = {
      comments: [],
      loading: false
    };
  });

  const comments = makeFakeUserComments();

  describe('loading comments',() => {

    test('should update loading to "true" if fetchComments is pending', () => {
      expect(getComments.reducer(state, {type: fetchComments.pending.type}))
        .toEqual({
          ...state,
          loading: true
        });
    });

    test(`loading dosen't change if fetchComments is fulfilled, and
    in comments add user comments`, () => {
      expect(getComments.reducer(state, {type: fetchComments.fulfilled.type, payload: comments}))
        .toEqual({
          ...state,
          comments: comments
        });
    });

    test('loading and comments dont\'t change if fetchComments is rejected', () => {
      expect(getComments.reducer(state, {type: fetchComments.rejected.type}))
        .toEqual({
          ...state
        });
    });
  });

  describe('sending user comments', () => {

    test(`loading dosen't change if fetchComments is fulfilled, and
    in comments add user comments`, () => {
      expect(getComments.reducer(state, addComments(comments)))
        .toEqual({
          ...state,
          comments: comments
        });
    });
  });
});
