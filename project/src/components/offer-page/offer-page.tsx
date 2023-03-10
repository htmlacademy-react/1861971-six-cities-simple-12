import { fetchOffersNear } from '../../store/api-actions/api-actions';
import { auth } from '../../store/selectors/data-authorization/selectors';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { Offer, AuthorizationStatus } from '../../types/const/const';
import HeaderPage from '../../pages/header-page/header-page';
import HeaderImage from '../../pages/header-image/header-image';
import HouseholdThingsList from '../../pages/household-things-list/household-things-list';
import PropertyFeatures from '../../pages/property-features/property-features';
import HostInformation from '../../pages/host-information/host-information';
import OfferList from '../../pages/offer-list/offer-list';
import ReviewsList from '../../pages/reviews-list/reviews-list';
import FormReview from '../../pages/form-review/form-review';

type OfferPageProps = {
  dataOffer: Offer;
}

function OfferPage ({dataOffer}: OfferPageProps): JSX.Element {
  const authorizationStatus = useAppSelector(auth);

  const {isPremium, title, description, type, bedrooms, maxAdults, rating, price, host, id} = dataOffer;

  return (
    <>
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
                {authorizationStatus === AuthorizationStatus.Auth && <FormReview hotelId={id}/>}
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
    </>
  );
}

export default OfferPage;
