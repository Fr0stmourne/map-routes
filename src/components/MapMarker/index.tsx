import { Marker, InfoWindow } from '@react-google-maps/api';
import React, { FC, useState } from 'react';
import { MapPoint } from '../../Models/models';

type Props = {
  point: MapPoint;
  onMarkerDrag: (e: google.maps.MapMouseEvent, id: string) => void;
};

const MapMarker: FC<Props> = ({ point, onMarkerDrag }: Props) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

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
          onCloseClick={() => {
            setIsInfoOpen(false);
          }}
        >
          <h2>{point.description}</h2>
        </InfoWindow>
      )}
    </Marker>
  );
};

export { MapMarker };
