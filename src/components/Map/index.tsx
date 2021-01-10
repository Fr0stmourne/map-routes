import { LoadScript, GoogleMap, Polyline } from '@react-google-maps/api';
import React, { CSSProperties, FC } from 'react';
import { MapPoint, MarkerDragHandler } from '../../models/models';
import { MapMarker } from '../MapMarker';

type Props = {
  setMapInstance: (map: google.maps.Map) => void;
  onMarkerDrag: MarkerDragHandler;
  mapPoints: MapPoint[];
};

const containerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: '100vh',
};

const center = { lat: 59.988933, lng: 30.255913 };

const Map: FC<Props> = ({ setMapInstance, onMarkerDrag, mapPoints }: Props) => {
  return process.env.REACT_APP_API_KEY ? (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        onLoad={(map) => {
          setMapInstance(map);
        }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {mapPoints &&
          mapPoints.map((point) => (
            <MapMarker
              onMarkerDrag={onMarkerDrag}
              key={point.id}
              point={point}
            />
          ))}
        <Polyline path={mapPoints.map(({ lat, lng }) => ({ lat, lng }))} />
      </GoogleMap>
    </LoadScript>
  ) : null;
};

export default React.memo(Map);
