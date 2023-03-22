import { useEffect, useState, useRef } from 'react';
import { featureGroup } from 'leaflet';
import { Map, FeatureGroup } from 'leaflet';
import { createMarker } from '../../util/util';
import { Offers, Offer } from '../../types/const/const';

function useCreatMarker (map: Map | null,
  offerList: Offers,
  indexPlase: number | undefined,
  nameSort: string | undefined,
  offer: Offer | undefined
) {

  const [ PlaceName, setPlaceName ] = useState({
    placeValue: '',
    sortValue: 'Popular'
  });

  const groupLayer = useRef<FeatureGroup | null>(null);


  useEffect(() => {
    if(!map || offerList.length === 0) {
      return;
    }

    const [ place ] = offerList;


    if ((PlaceName.sortValue !== nameSort || place.city.name !== PlaceName.placeValue) && nameSort !== undefined) {
      groupLayer.current?.clearLayers();
      groupLayer.current = null;
      if(nameSort) {setPlaceName({
        ...PlaceName,
        sortValue: nameSort
      });
      }
    }


    if (place.city.name !== PlaceName.placeValue) {
      const markers = featureGroup(createMarker(offerList, indexPlase, offer));
      groupLayer.current = markers;
      groupLayer.current?.addTo(map);

      setPlaceName({
        ...PlaceName,
        placeValue: place.city.name
      });
    }


    if (place.city.name === PlaceName.placeValue) {
      groupLayer.current?.clearLayers();
      groupLayer.current = null;
      const markers = featureGroup(createMarker(offerList, indexPlase, offer));
      groupLayer.current = markers;
      groupLayer.current?.addTo(map);

    }


  }, [map, offerList, indexPlase, PlaceName, nameSort, offer]);

}

export default useCreatMarker;
