import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import { DEFAULT_MAP_ZOOM } from '../const';


function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: {
  latitude: number;
  longitude: number;
  zoom: number;
}): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude
        },
        zoom: DEFAULT_MAP_ZOOM
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );
      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [map, mapRef, location]);

  return map;
}

export default useMap;
