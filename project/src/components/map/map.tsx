import { useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { useAppSelector } from '../../hooks/use-store/use-store';
import useCreateMarker from '../../hooks/use-create-marker/use-creat-marker';
import { dataOffers } from '../../store/selectors/data-offer-list/selectors';
import { Offers, Offer } from '../../types/const/const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  sizeMap: string;
  indexPlace?: number;
  sortName?: string;
  offer?: Offer | undefined;
}

function Map ({sizeMap, indexPlace, sortName, offer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const offerList: Offers = useAppSelector(dataOffers);
  const map = useMap(mapRef, offerList);
  useCreateMarker(map, offerList, indexPlace, sortName, offer);

  return (
    sizeMap === '682px' ?
      <section className="cities__map map" style={{height: sizeMap}} ref={mapRef}></section> :
      <section className="property__map map" style={{height: sizeMap}} ref={mapRef}></section>
  );
}

export default Map;
