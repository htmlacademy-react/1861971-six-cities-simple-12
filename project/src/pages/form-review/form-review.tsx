import { SyntheticEvent, useState, ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store/use-store';
import { postCommentOnServer } from '../../store/api-actions/api-actions';
import { load } from '../../store/selectors/data-load-user-comment/selectors';
import { changeValidatStar, changeValidatText } from '../../util/util';
import Stars from '../stars/stars';

type SetValidat = React.Dispatch<React.SetStateAction<{
  validatStar: boolean;
  validatText: boolean;
}>>

type Validate = {
  validatStar: boolean;
  validatText: boolean;
}

type FormReviewProps = {
  hotelId: number;
}

function FormReview ({hotelId}: FormReviewProps): JSX.Element {
  const [ star, setStar] = useState('');
  const [ text, setText] = useState('');
  const [ validate, setValidat ] = useState({
    validatStar: false,
    validatText: false
  });

  const dispatch = useAppDispatch();
  const stateLoading = useAppSelector(load);

  const numberStar = useCallback ((evt: ChangeEvent<HTMLInputElement>) => {
    setStar(evt.target.value);
    changeValidatStar<SetValidat, Validate>(setValidat, validate, star);
  }, [star,validate]);

  const changeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setText(evt.target.value);
    changeValidatText<SetValidat, Validate>(setValidat, validate, text);
  };

  const sendReviw = (evt: SyntheticEvent) => {
    evt.preventDefault();

    const newComment = {
      comment: text,
      rating: Number(star),
      id: hotelId
    };

    dispatch(postCommentOnServer(newComment));
  };

  if(stateLoading.type === 'fulfilled') {
    setStar('');
    setText('');
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={sendReviw}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <Stars onNamberStar={numberStar} numberStar={star}/>
      </div>
      {!validate.validatStar && <p className="reviews__help" style={{color: 'red'}}>Select rating!!!</p>}
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={changeText}></textarea>
      {!validate.validatText && <p className="reviews__help" style={{color: 'red'}}>Number of characters from 50 to 300!!!</p>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        {validate.validatStar && validate.validatText ?
          <button className="reviews__submit form__submit button" type="submit" disabled={false}>Submit</button> :
          <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>}
      </div>
    </form>
  );
}

export default FormReview;
