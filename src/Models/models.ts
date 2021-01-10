import { DropResult } from 'react-beautiful-dnd';

export type MapPoint = {
  id: string;
  lat: number;
  lng: number;
  description: string;
};

export type MarkerDragHandler = (
  e: google.maps.MapMouseEvent,
  id: string
) => void;

export type ItemDragHandler = (result: DropResult) => void;

export type DeleteClickHandler = (id: MapPoint['id']) => void;

export type AddClickHandler = (value: string) => void;
