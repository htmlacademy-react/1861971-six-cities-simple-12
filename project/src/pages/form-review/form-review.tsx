import { SyntheticEvent, useState, ChangeEvent, useCallback, memo } from 'react';
import { useAppDispatch } from '../../hooks/use-store/use-store';
import { postCommentOnServer } from '../../store/api-actions/api-actions';
import { changeValidatStar, changeValidatText } from '../../util/util';
import { UserComment } from '../../types/const/const';
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
  const [form, setForm] = useState({
    star: '',
    text: '',
    lockForm: false
  });

  const [ validate, setValidat ] = useState({
    validatStar: false,
    validatText: false
  });

  const dispatch = useAppDispatch();


  const numberStar = useCallback ((evt: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      star: evt.target.value
    });
    changeValidatStar<SetValidat, Validate>(setValidat, validate, form.star);
  }, [form, validate]);


  const changeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      text: evt.target.value
    });
    changeValidatText<SetValidat, Validate>(setValidat, validate, form.text);
  };


  const handleFormSubmit = async (newComment: UserComment) => {
    try {
      await dispatch(postCommentOnServer(newComment)).unwrap();
      setForm({
        ...form,
        star: '',
        text: '',
        lockForm: false
      });

      setValidat({
        ...validate,
        validatStar: false,
        validatText: false
      });
    } catch (error) {
      setForm({
        ...form,
        lockForm: false
      });
    }
  };


  const sendReviw = (evt: SyntheticEvent) => {
    evt.preventDefault();

    const newComment = {
      comment: form.text,
      rating: Number(form.star),
      id: hotelId
    };

    setForm({
      ...form,
      lockForm: true
    });

    handleFormSubmit(newComment);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={sendReviw}>
      <fieldset disabled={form.lockForm}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <Stars onNamberStar={numberStar} numberStar={form.star}/>
        </div>
        {!validate.validatStar && <p className="reviews__help" style={{color: 'red'}}>Select rating!!!</p>}
        <textarea
          className="reviews__textarea form__textarea"
          id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={form.text}
          onChange={changeText}
        >
        </textarea>
        {!validate.validatText && <p className="reviews__help" style={{color: 'red'}}>Number of characters from 50 to 300!!!</p>}
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          {validate.validatStar && validate.validatText ?
            <button className="reviews__submit form__submit button" type="submit" disabled={false}>Submit</button> :
            <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>}
        </div>
      </fieldset>
    </form>
  );
}

export default memo(FormReview);
