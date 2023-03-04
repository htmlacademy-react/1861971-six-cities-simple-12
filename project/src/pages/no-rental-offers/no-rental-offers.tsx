import { useAppSelector } from '../../hooks/use-store/use-store';
import { loading } from '../../store/selectors/data-offers/selectors';

function NoRentalOffers (): JSX.Element {
  const loadValue: boolean = useAppSelector(loading);

  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          {!loadValue &&
          <>
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
          </>}
          {loadValue && <b className="cities__status">Loading offers</b>}
        </div>
      </section>
      <div
        className="cities__right-section"
        style={{
          backgroundImage: 'url(img/no-places.png)',
          backgroundRepeat: 'no-repeat'
        }}
      >

      </div>
    </div>
  );
}

export default NoRentalOffers;
