import block from 'bem-cn';
import React, { FC, useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import { nanoid } from 'nanoid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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

  const formatCoordinate = (coord: number) => coord.toFixed(4);

  const onDeleteClick = (id: string) => {
    setMapPoints((points) => points.filter((point) => point.id !== id));
  };

  return (
    <div className={b()}>
      <Input onAddButtonClick={onAddButtonClick} />
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
                        ref={providedDrag.innerRef}
                        {...providedDrag.draggableProps}
                        {...providedDrag.dragHandleProps}
                      >
                        <RoutePoint
                          onDeleteButtonClick={onDeleteClick}
                          id={el.id}
                          text={`${el.description} - ${formatCoordinate(
                            el.lat
                          )}, ${formatCoordinate(el.lng)}`}
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
