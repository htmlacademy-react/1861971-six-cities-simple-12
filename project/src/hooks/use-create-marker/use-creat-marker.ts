import { useEffect, useState, useRef } from 'react';
import { featureGroup } from 'leaflet';
import { Map, FeatureGroup } from 'leaflet';
import { createMarker } from '../../util/util';
import { Offers, Offer } from '../../types/const/const';

function useCreateMarker (map: Map | null,
  offerList: Offers,
  indexPlace: number | undefined,
  nameSort: string,
  offer: Offer | undefined
) {

  const [ PlaceName, setPlaceName ] = useState({
    placeValue: '',
    sortValue: ''
  });

  const groupLayer = useRef<FeatureGroup | null>(null);

  useEffect(() => {
    if(!map || offerList.length === 0) {
      return;
    }

    const [ place ] = offerList;


    if (place.city.name !== PlaceName.placeValue || nameSort !== PlaceName.sortValue) {
      groupLayer.current?.clearLayers();
      groupLayer.current = null;
      const markers = featureGroup(createMarker(offerList, indexPlace, offer));
      groupLayer.current = markers;
      groupLayer.current?.addTo(map);
      setPlaceName({
        ...PlaceName,
        placeValue: place.city.name,
        sortValue: nameSort
      });
    }


  }, [map, offerList, indexPlace, PlaceName, nameSort, offer]);

}

export default useCreateMarker;
