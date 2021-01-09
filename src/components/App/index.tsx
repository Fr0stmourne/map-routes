import block from 'bem-cn';
import React, { CSSProperties, FC, useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import { nanoid } from 'nanoid';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { PointForm } from '../PointForm';
import { RoutePoint } from '../RoutePoint';
import { MapPoint } from '../../models/models';
import { MapMarker } from '../MapMarker';
import './index.scss';

const b = block('app');
const containerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: '100vh',
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

  const onDeleteClick = (id: string) => {
    setMapPoints((points) => points.filter((point) => point.id !== id));
  };

  return (
    <div className={b()}>
      <div className={b('routes')}>
        <div className={b('input')}>
          <PointForm onAddButtonClick={onAddButtonClick} />
        </div>
        <DragDropContext
          onDragEnd={(result) => {
            const updatedMapPoints = [...mapPoints];
            const [reordered] = updatedMapPoints.splice(result.source.index, 1);
            if (result.destination) {
              updatedMapPoints.splice(result.destination.index, 0, reordered);
              setMapPoints(updatedMapPoints);
            }
          }}
        >
          <Droppable droppableId="routes-list">
            {(providedDrop) => (
              <ul
                className={b('list')}
                ref={providedDrop.innerRef}
                {...providedDrop.droppableProps}
              >
                {mapPoints &&
                  mapPoints.map((el, index) => (
                    <Draggable draggableId={el.id} index={index} key={el.id}>
                      {(providedDrag) => (
                        <li
                          className={b('route-point')}
                          ref={providedDrag.innerRef}
                          {...providedDrag.draggableProps}
                          {...providedDrag.dragHandleProps}
                        >
                          <RoutePoint
                            onDeleteButtonClick={onDeleteClick}
                            point={el}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                {providedDrop.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {process.env.REACT_APP_API_KEY && (
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
      )}
    </div>
  );
};

export default App;
