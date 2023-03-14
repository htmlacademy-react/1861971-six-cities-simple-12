import { useEffect, useState } from 'react';
import { layerGroup } from 'leaflet';
import { Map } from 'leaflet';
import { createMarker } from '../../util/util';
import { Offers, Offer } from '../../types/const/const';

function useCreatMarker (map: Map | null,
  offerList: Offers,
  indexPlase: number | undefined,
  nameSort: string | undefined) {

  const [ namePlase, setNamePlase ] = useState({
    valuePlase: '',
    valueSort: ''
  });

  useEffect(() => {
    if(!map || offerList.length === 0) {
      return;
    }

    const markerGroup = layerGroup().addTo(map);
    const [ place ] = offerList;

    if (namePlase.valueSort !== nameSort && nameSort !== undefined) {
      markerGroup.clearLayers();
      setNamePlase({
        ...namePlase,
        valueSort: nameSort
      });
    }

    if (place.city.name !== namePlase.valuePlase) {

      offerList.forEach((offer: Offer) => {
        createMarker(offer, indexPlase)
          .addTo(markerGroup);
      });

      setNamePlase({
        ...namePlase,
        valuePlase: place.city.name
      });
    }

    if (place.city.name === namePlase.valuePlase) {

      offerList.forEach((offer: Offer) => {
        createMarker(offer, indexPlase)
          .addTo(markerGroup);
      });
    }

  }, [map, offerList, indexPlase, namePlase, nameSort]);

}

export default useCreatMarker;
