import { Marker, InfoWindow } from '@react-google-maps/api';
import React, { FC, useState } from 'react';
import { MapPoint, MarkerDragHandler } from '../../models';

export type Props = {
  point: MapPoint;
  onMarkerDrag: MarkerDragHandler;
};

const MapMarker: FC<Props> = ({ point, onMarkerDrag }: Props) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleWindowClose = () => {
    setIsInfoOpen(false);
  };

  return (
    <Marker
      key={point.description}
      position={{ lat: point.lat, lng: point.lng }}
      onClick={() => {
        setIsInfoOpen(true);
      }}
      draggable
      onDragEnd={(e: google.maps.MapMouseEvent) => {
        onMarkerDrag(e, point.id);
      }}
    >
      {isInfoOpen && (
        <InfoWindow
          onCloseClick={handleWindowClose}
          onUnmount={handleWindowClose}
        >
          <h2>{point.description}</h2>
        </InfoWindow>
      )}
    </Marker>
  );
};

export { MapMarker };
