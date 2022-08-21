import {useRef, useEffect} from 'react';
import L, {Icon, LatLng, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT} from '../../const';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';


const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

const markerGroup = L.layerGroup();

function Map(): JSX.Element {

  const {city} = useParams();
  const {serverOffers} = useAppSelector((state) => state);
  const selectedCityOffers = serverOffers.filter((offerObj) =>offerObj.city.name === city);
  const {location} = selectedCityOffers[0];
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    markerGroup.clearLayers();
    if (map) {
      selectedCityOffers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });
        marker
          .setIcon(defaultCustomIcon)
          .addTo(markerGroup);
      });
      markerGroup.addTo(map);
      map.setView(new LatLng(selectedCityOffers[0].city.location.latitude, selectedCityOffers[0].city.location.longitude), map.getZoom());
    }

  }, [map, selectedCityOffers]);

  return <div style={{height: '1000px'}} ref={mapRef} className='cities__map'></div>;
}

export default Map;
