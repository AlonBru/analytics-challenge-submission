import React, { useState, useEffect } from 'react';
import {
  GoogleMap, LoadScript, Marker, InfoWindow, MarkerClusterer,
} from '@react-google-maps/api';
import axios from 'axios';
import styled from 'styled-components';
import { MapData } from '../../models/event';
import mapKey from './mapKey'
const containerStyle = {
  width: '500px',
  height: '100%',
};
const Avatar = styled.img`
height:100px;
width:100px;
border-radius:50%;
border:5px blue solid;
`;
const Info = styled.div`
display:flex;
flex-direction:column;
align-items:center;
background-color:aliceblue;
padding:2px;
img{
  background-color:indigo;
}
*{
  margin:2px;
}
`;

const center = {
  lat: 31,
  lng: 35,
};

function Map() {
  const [map, setMap] = useState<google.maps.Map|undefined>(undefined);
  const [markers, setMarkers] = useState<(google.maps.Marker|undefined)[]>([]);
  const [infos, setInfos] = useState<(google.maps.InfoWindow|undefined)[]>([]);
  const [events, setEvents] = useState<MapData[]|undefined>();
  useEffect(() => {
    axios.get('/events/geolocation')
      .then(({ data }) => setEvents(data));
  }, []);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(undefined);
  }, []);

  const markerLoad = (marker:google.maps.Marker) => {
    markers.push(marker);
  };

  const infoLoad = (info:google.maps.InfoWindow) => {
    info.open();
    infos.push(info);
  };

  const markerClick = (e:google.maps.MouseEvent) => {
    const marker:google.maps.Marker|undefined = markers.find((marker) => marker?.getPosition() === e.latLng);
    const i = markers.indexOf(marker);
    infos[i]?.open(map, marker);
  };

  const clusterOptions = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };
  return (
    events
      ? (
        <>
          <LoadScript
            googleMapsApiKey={mapKey}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={1}
              onLoad={onLoad}
              options={{
                streetViewControl: false,
                center,
                mapTypeControl: false,
                fullscreenControl: false,
                scaleControl: true,
              }}
              onUnmount={onUnmount}
            >
              <MarkerClusterer
                options={clusterOptions}
              >
                {(clusterer) =>
                // @ts-ignore
                 events?.map((event) => {
                   const {
                     location, user, date, avatar, type
                   } = event;
                   return (
                     <Marker
                       onLoad={markerLoad}
                       onClick={markerClick}
                       // @ts-ignore
                       position={location}
                       clickable
                       key={String(location?.lat) + String(location?.lng)+user}
                       clusterer={clusterer}
                     >
                       <InfoWindow
                         onLoad={infoLoad}
                       >
                         <Info>
                           <Avatar src={avatar} />
                           <span>
                        user:
                             {' '}
                             {user}
                           </span>
                           <span>
                        event:
                             {' '}
                             {type}
                           </span>
                           {' '}
                           <br />
                           <span>
                        time:
                             {' '}
                             {date}
                           </span>
                         </Info>
                       </InfoWindow>
                     </Marker>
                   );
                 }) }
              </MarkerClusterer>
              <></>
            </GoogleMap>
          </LoadScript>
        </>
      )
      : <h1> Loading...</h1>

  );
}

export default React.memo(Map);
