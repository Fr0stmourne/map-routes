import block from 'bem-cn';
import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid';

import { PointForm } from '../PointForm';
import {
  ItemDragHandler,
  MapPoint,
  MarkerDragHandler,
  DeleteClickHandler,
  AddClickHandler,
} from '../../models';
import { Map } from '../Map';
import './index.scss';
import { PointList } from '../PointList';

const b = block('app');

const App: FC = () => {
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [mapInstance, setMapInstance] = useState<google.maps.Map>();

  const handleAddButtonClick: AddClickHandler = (value) => {
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
  };

  const handleMarkerDrag: MarkerDragHandler = (e, id) => {
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

  const handleDeleteClick: DeleteClickHandler = (id) => {
    setMapPoints((points) => points.filter((point) => point.id !== id));
  };

  const handleDragEnd: ItemDragHandler = (result) => {
    const updatedMapPoints = [...mapPoints];
    const [reordered] = updatedMapPoints.splice(result.source.index, 1);
    if (result.destination) {
      updatedMapPoints.splice(result.destination.index, 0, reordered);
      setMapPoints(updatedMapPoints);
    }
  };

  return (
    <div className={b()}>
      <h1 className={b('title')}>Редактор маршрутов</h1>
      <section className={b('routes')}>
        <h2 className={b('routes-title')}>Список точек</h2>
        <div className={b('input')}>
          <PointForm onAddButtonClick={handleAddButtonClick} />
        </div>
        <PointList
          onDeleteClick={handleDeleteClick}
          onDragEnd={handleDragEnd}
          mapPoints={mapPoints}
        />
      </section>
      <section className={b('map')}>
        <h2 className={b('map-title')}>Точки на карте</h2>
        <Map
          onMarkerDrag={handleMarkerDrag}
          setMapInstance={setMapInstance}
          mapPoints={mapPoints}
        />
      </section>
    </div>
  );
};

export default App;
