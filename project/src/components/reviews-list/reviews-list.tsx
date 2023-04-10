import { AxiosInstance } from 'axios';
import { AsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { useRequestServer } from '../../hooks/use-request-server/use-request-server';
import { fetchComments } from '../../store/api-actions/api-actions';
import { comments, loading } from '../../store/selectors/data-comments/selectors';
import { Comments } from '../../types/const/const';

type FetchOffer = AsyncThunk<Comments, number, {
  extra: AxiosInstance;
}>;

type ReviewsListProps = {
  hotelId: number;
}

function ReviewsList ({hotelId}: ReviewsListProps): JSX.Element {
  useRequestServer<FetchOffer, number>(fetchComments, hotelId);

  const loadingComments = useAppSelector(loading);
  const commentsList = useAppSelector(comments);

  const newCommentsList = commentsList ? commentsList.slice(0, 10) : commentsList;

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{newCommentsList.length}</span></h2>
      {newCommentsList && newCommentsList.map((comment) => {
        const {name, avatarUrl} = comment.user;

        return (
          <ul key={comment.id} className="reviews__list">
            <li className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
                </div>
                <span className="reviews__user-name">
                  {name}
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: `${comment.rating * 2}0%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {comment.comment}
                </p>
                <time className="reviews__time" dateTime={dayjs(comment.date).format('MMMM YYYY')}>{dayjs(comment.date).format('MMMM YYYY')}</time>
              </div>
            </li>
          </ul>
        );}
      )}
      {loadingComments && <b className="cities__status">...Loading comments. Please wait.</b>}
    </>
  );
}

export default ReviewsList;
