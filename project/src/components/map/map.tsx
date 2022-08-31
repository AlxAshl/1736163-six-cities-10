import {useRef, useEffect} from 'react';
import L, {Icon, LayerGroup, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import { useLocation, useParams } from 'react-router-dom';
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
  serverOffers: Offer[]
  selectedCard: Offer | undefined;
}


function Map({serverOffers, selectedCard}:MapProps): JSX.Element {

  markerGroup.clearLayers();
  const currentLocation = useLocation();
  const isMainPage = defineLocation(currentLocation.pathname);
  const {city} = useParams();
  const selectedCityOffers = serverOffers.filter((offerObj) =>offerObj.city.name === city);
  const {location} = selectedCityOffers[0];
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if(map){
      markerGroup.remove();
      markerGroup.clearLayers();
    }

    if (map) {

      if(!isMainPage){
        map.scrollWheelZoom.disable();
        map.setZoom(13);
      }

      selectedCityOffers.forEach((point) => {
        marker = L.marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });
        marker
          .setIcon((selectedCard !== undefined && point.id === selectedCard.id)
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

  }, [selectedCityOffers, selectedCard, isMainPage, map]);

  return <div style={isMainPage ? {height: '1000px'} : {height: '500px', width: '70%', left: '15%'}} ref={mapRef} className={isMainPage ? 'cities__map' : 'property__map map'}></div>;
}

export default Map;

