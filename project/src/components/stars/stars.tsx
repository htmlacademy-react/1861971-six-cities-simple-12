import { ChangeEvent, memo } from 'react';
import { TITLES } from '../../types/const/const';

type NumberStar = (evt: ChangeEvent<HTMLInputElement>) => void;

type StarsProps = {
  onNamberStar: NumberStar;
  number: number;
}

function Stars ({onNamberStar, number}: StarsProps): JSX.Element {
  return (
    <>
      {TITLES.map((titil, index) => {
        const id = 5 - index;
        return (
          <div key={titil}>
            <input className="form__rating-input visually-hidden" name="rating" value={id}
              id={id < 2 ? `${id}-star` : `${id}-stars`} type="radio"
              onChange={onNamberStar}
            />
            <label htmlFor={id < 2 ? `${id}-star` : `${id}-stars`} className="reviews__rating-label form__rating-label" title={titil}>
              <svg className="form__star-image" width="37" height="33" >
                <use xlinkHref="#icon-star" fill={number >= id ? '#ff9000' : '#c7c7c7'}></use>
              </svg>
            </label>
          </div>
        );
      }
      )}
    </>
  );
}

export default memo(Stars);
