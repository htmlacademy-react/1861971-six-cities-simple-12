import { useEffect, useState, useRef } from 'react';
import { featureGroup } from 'leaflet';
import { Map, FeatureGroup } from 'leaflet';
import { createMarker } from '../../util/util';
import { Offers } from '../../types/const/const';

function useCreatMarker (map: Map | null,
  offerList: Offers,
  indexPlase: number | undefined,
  nameSort: string | undefined) {

  const [ namePlase, setNamePlase ] = useState({
    valuePlase: '',
    valueSort: 'Popular'
  });

  const groupLayer = useRef<FeatureGroup | null>(null);


  useEffect(() => {
    if(!map || offerList.length === 0) {
      return;
    }

    const [ place ] = offerList;


    if ((namePlase.valueSort !== nameSort || place.city.name !== namePlase.valuePlase) && nameSort !== undefined) {
      groupLayer.current?.clearLayers();
      groupLayer.current = null;
      if(nameSort) {setNamePlase({
        ...namePlase,
        valueSort: nameSort
      });
      }
    }


    if (place.city.name !== namePlase.valuePlase) {
      const markers = featureGroup(createMarker(offerList, indexPlase));
      groupLayer.current = markers;
      groupLayer.current?.addTo(map);

      setNamePlase({
        ...namePlase,
        valuePlase: place.city.name
      });
    }


    if (place.city.name === namePlase.valuePlase) {
      groupLayer.current?.clearLayers();
      groupLayer.current = null;
      const markers = featureGroup(createMarker(offerList, indexPlase));
      groupLayer.current = markers;
      groupLayer.current?.addTo(map);

    }


  }, [map, offerList, indexPlase, namePlase, nameSort]);

}

export default useCreatMarker;
