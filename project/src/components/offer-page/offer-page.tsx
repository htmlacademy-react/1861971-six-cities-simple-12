import { AxiosInstance } from 'axios';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { useRequestServer } from '../../hooks/use-request-server/use-request-server';
import { fetchOffer } from '../../store/api-actions/api-actions';
import { fetchOffersNear } from '../../store/api-actions/api-actions';
import { offer } from '../../store/selectors/data-offer/selectors';
import { Offer } from '../../types/const/const';
import HeaderPage from '../../pages/header-page/header-page';
import HeaderImage from '../../pages/header-image/header-image';
import HouseholdThingsList from '../../pages/household-things-list/household-things-list';
import PropertyFeatures from '../../pages/property-features/property-features';
import HostInformation from '../../pages/host-information/host-information';
import OfferList from '../../pages/offer-list/offer-list';
import ReviewsList from '../../pages/reviews-list/reviews-list';

type FetchOffer = AsyncThunk<Offer, number, {
  extra: AxiosInstance;
}>;

function OfferPage (): JSX.Element {
  const hotelId = useParams();

  useRequestServer<FetchOffer, number>(fetchOffer, Number(hotelId.id));
  const dataOffer = useAppSelector(offer);

  if(!dataOffer) {
    return;
  }

  const {isPremium, title, description, type, bedrooms, maxAdults, rating, price, host, id} = dataOffer;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <HeaderPage/>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <HeaderImage images={dataOffer.images}/>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  Beautiful &amp; {title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${Math.floor(rating) * 2}0%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <PropertyFeatures typeApartment={type} room={bedrooms} maxPeople={maxAdults}/>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <HouseholdThingsList things={dataOffer.goods}/>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <HostInformation hostData={host}/>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList hotelId={id}/>
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div className="reviews__rating-form form__rating">
                    <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                    <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                    <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
                    <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
                    <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>
                  </div>
                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OfferList requestData={fetchOffersNear} hotelId={id}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
