import { Link } from 'react-router-dom';
import { Offer, Path } from '../../types/const/const';

type ChangeNameCity = (index: number) => void;

type OfferCardProps = {
  offer: Offer;
  onChangeNameCity?: ChangeNameCity;
}

function OfferCard ({offer, onChangeNameCity}: OfferCardProps): JSX.Element {
  const {previewImage, title, price, type, isPremium, rating, id} = offer;

  const offerPath = `${Path.OfferPath}${id}`;

  return (
    <article className="cities__card place-card" onMouseEnter={() => onChangeNameCity(id)}>
      {
        isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href='#todo'>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title}/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.ceil(rating)}0%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerPath}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
