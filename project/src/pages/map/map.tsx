import { useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { useAppSelector } from '../../hooks/use-store/use-store';
import useCreatMarker from '../../hooks/use-creat-marker/use-creat-marker';
import { dataOffers } from '../../store/selectors/data-offer-list/selectors';
import { Offers, Offer } from '../../types/const/const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  sizeMap: string;
  indexPlase?: number;
  nameSort?: string;
  offer?: Offer | undefined;
}

function Map ({sizeMap, indexPlase, nameSort, offer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const offerList: Offers = useAppSelector(dataOffers);
  //if(offer !== undefined){offerList.map(offer);}
  const map = useMap(mapRef, offerList);
  useCreatMarker(map, offerList, indexPlase, nameSort);

  return (
    sizeMap === '682px' ?
      <section className="cities__map map" style={{height: sizeMap}} ref={mapRef}></section> :
      <section className="property__map map" style={{height: sizeMap}} ref={mapRef}></section>
  );
}

export default Map;
