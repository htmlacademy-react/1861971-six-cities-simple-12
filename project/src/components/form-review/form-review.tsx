import { SyntheticEvent, useState, ChangeEvent, useCallback, memo } from 'react';
import { useAppDispatch } from '../../hooks/use-store/use-store';
import { postCommentOnServer } from '../../store/api-actions/api-actions';
import { validateStars, validateText } from '../../util/util';
import { UserComment } from '../../types/const/const';
import Stars from '../stars/stars';

type SetValidate = React.Dispatch<React.SetStateAction<{
  isValidateStar: boolean;
  isValidateText: boolean;
}>>

type Validate = {
  isValidateStar: boolean;
  isValidateText: boolean;
}

type FormReviewProps = {
  hotelId: number;
}

function FormReview ({hotelId}: FormReviewProps): JSX.Element {
  const [ form, setForm ] = useState({
    star: '',
    text: '',
    isLockForm: false
  });

  const [ validate, setValidate ] = useState({
    isValidateStar: false,
    isValidateText: false
  });

  const dispatch = useAppDispatch();


  const numberStar = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      star: evt.target.value
    });
    validateStars<SetValidate, Validate>(setValidate, validate, evt.target.value);
  }, [form, validate]);


  const changeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      text: evt.target.value
    });
    validateText<SetValidate, Validate>(setValidate, validate, form.text);
  };


  const handleFormSubmit = async (newComment: UserComment) => {
    try {
      await dispatch(postCommentOnServer(newComment)).unwrap();
      setForm({
        ...form,
        star: '',
        text: '',
        isLockForm: false
      });

      setValidate({
        ...validate,
        isValidateStar: false,
        isValidateText: false
      });
    } catch (error) {
      setForm({
        ...form,
        isLockForm: false
      });
    }
  };


  const sendReview = (evt: SyntheticEvent) => {
    evt.preventDefault();

    const newComment = {
      comment: form.text,
      rating: Number(form.star),
      id: hotelId
    };

    setForm({
      ...form,
      isLockForm: true
    });

    handleFormSubmit(newComment);
  };

  return (

    <form className="reviews__form form" action="#" method="post" onSubmit={sendReview}>
      <fieldset style={{borderStyle: 'none'}} disabled={form.isLockForm}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <Stars onNamberStar={numberStar} number={Number(form.star)}/>
        </div>
        {!validate.isValidateStar && <p className="reviews__help" style={{color: 'red'}}>Select rating!!!</p>}
        <textarea
          className="reviews__textarea form__textarea"
          id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={form.text}
          onChange={changeText}
        >
        </textarea>
        {!validate.isValidateText && <p className="reviews__help" style={{color: 'red'}}>Number of characters from 50 to 300!!!</p>}
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          {validate.isValidateStar && validate.isValidateText ?
            <button className="reviews__submit form__submit button" type="submit" disabled={false}>Submit</button> :
            <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>}
        </div>
      </fieldset>
    </form>

  );
}

export default memo(FormReview);
