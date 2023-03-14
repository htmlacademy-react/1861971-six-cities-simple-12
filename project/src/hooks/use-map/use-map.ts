import {useEffect, useState, useRef, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import { Map } from 'leaflet';
import { Offers } from '../../types/const/const';

function useMap(mapRef: MutableRefObject<null | HTMLElement>, offerList: Offers) {
  const [map, setMap] = useState<null | Map>(null);
  const isRenderedMap = useRef('');


  useEffect(() => {
    if(offerList.length === 0) {
      return;
    }

    const [ place ] = offerList;
    const { location:{latitude,longitude,zoom}, name } = place.city;

    if (isRenderedMap.current !== name && map) {
      map.remove();
      setMap(null);
    }

    if (mapRef.current !== null && isRenderedMap.current !== name) {

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
      isRenderedMap.current = name;
    }
  }, [mapRef, offerList, map]);

  return map;
}

export default useMap;
