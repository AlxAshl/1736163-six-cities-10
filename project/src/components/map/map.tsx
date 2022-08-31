import {useRef, useEffect} from 'react';
import L, {Icon, LatLng, LayerGroup, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import { useLocation } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { defineLocation } from '../../utils';


const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const markerGroup: LayerGroup = L.layerGroup();
let marker: Marker;
type MapProps = {
  cityOffers: Offer[]
  selectedCard: Offer | undefined;
}


function Map({cityOffers, selectedCard}:MapProps): JSX.Element {

  const currentLocation = useLocation();
  const isMainPage = defineLocation(currentLocation.pathname);
  const location = cityOffers[0].location;
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {

    if (map) {

      map.setView(new LatLng(location.latitude, location.longitude), map.getZoom());
      markerGroup.remove();
      markerGroup.clearLayers();

      if(!isMainPage){
        map.scrollWheelZoom.disable();
        map.setZoom(13);
      }

      cityOffers.forEach((point) => {
        marker = L.marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });
        marker
          .setIcon((selectedCard !== undefined && point.id === selectedCard.id && isMainPage)
            ? currentCustomIcon
            : defaultCustomIcon)

          .addTo(markerGroup);
        marker.removeFrom(map);
        selectedCard !== undefined && point.id === selectedCard.id && isMainPage
          ? map.flyTo(marker.getLatLng())
          : marker.remove();
      });
      markerGroup.addTo(map);
    }

  }, [cityOffers, selectedCard, isMainPage, map, location]);

  return <div style={isMainPage ? {height: '1000px'} : {height: '500px', width: '70%', left: '15%'}} ref={mapRef} className={isMainPage ? 'cities__map' : 'property__map map'}></div>;
}

export default Map;

