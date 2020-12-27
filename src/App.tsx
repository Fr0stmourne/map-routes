import block from 'bem-cn';
import React, { FC, useCallback, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Polyline,
} from '@react-google-maps/api';
import { nanoid } from 'nanoid';

import { Input } from './components/Input';
import { RoutePoint } from './components/RoutePoint';
import { MapPoint } from './Models/models';
import { MapMarker } from './components/MapMarker';

const b = block('app');
const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = { lat: 59.988933, lng: 30.255913 };

const App: FC = () => {
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [mapInstance, setMapInstance] = useState<google.maps.Map>();

  const onAddButtonClick = useCallback(
    (value: string) => {
      if (mapInstance) {
        const currentCenter = mapInstance.getCenter();
        const [lat, lng] = [currentCenter.lat(), currentCenter.lng()];

        setMapPoints((points) => [
          ...points,
          {
            lat,
            lng,
            description: value,
            id: nanoid(),
          },
        ]);
      }
    },
    [mapInstance]
  );

  const onMarkerDrag = (e: google.maps.MapMouseEvent, id: string) => {
    const position = e.latLng;
    const [lat, lng] = [position.lat(), position.lng()];
    setMapPoints((points) => {
      const updatedPoints = [...points];
      const draggedMarker = updatedPoints.find((point) => point.id === id);
      if (draggedMarker) {
        draggedMarker.lat = lat;
        draggedMarker.lng = lng;
      }

      return updatedPoints;
    });
  };

  return (
    <div className={b()}>
      <Input onAddButtonClick={onAddButtonClick} />
      <ul className={b('list')}>
        {mapPoints &&
          mapPoints.map((el, index) => (
            <RoutePoint
              key={String(index)}
              text={`${el.description} - ${el.lat.toFixed(4)}, ${el.lng.toFixed(
                4
              )}`}
            />
          ))}
      </ul>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY as string}>
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
                key={point.description + point.lat}
                point={point}
              />
            ))}
          <Polyline
            path={mapPoints.map(({ lat, lng }) => ({ lat, lng }))}
          ></Polyline>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default App;
