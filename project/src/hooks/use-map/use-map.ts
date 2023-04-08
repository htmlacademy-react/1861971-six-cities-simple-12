import {useEffect, useState, useRef, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import { Map } from 'leaflet';
import { Offers } from '../../types/const/const';

function useMap(mapRef: MutableRefObject<null | HTMLElement>, offerList: Offers) {
  const [map, setMap] = useState<null | Map>(null);
  const isRenderedMap = useRef(false);

  useEffect(() => {
    if(offerList.length === 0){
      return;
    }

    const [ place ] = offerList;
    const { location:{latitude,longitude,zoom} } = place.city;

    if (mapRef.current !== null && !isRenderedMap.current) {

      const instanceMap = leaflet.map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instanceMap);
      setMap(instanceMap);
      isRenderedMap.current = true;
    }

    if(map && offerList.length !== 0) {
      map.setView(new leaflet.LatLng(latitude, longitude), 12);
    }
  }, [mapRef, offerList, map]);

  return map;
}

export default useMap;
