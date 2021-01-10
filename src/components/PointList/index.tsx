import block from 'bem-cn';
import React, { FC } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  DeleteClickHandler,
  ItemDragHandler,
  MapPoint,
} from '../../models/models';
import { Point } from '../Point';
import './index.scss';

const b = block('point-list');

export type Props = {
  mapPoints: MapPoint[];
  onDeleteClick: DeleteClickHandler;
  onDragEnd: ItemDragHandler;
};

const PointList: FC<Props> = ({
  mapPoints,
  onDragEnd,
  onDeleteClick,
}: Props) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="route-list">
        {(providedDrop) => (
          <ul
            className={b()}
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
                      <Point onDeleteButtonClick={onDeleteClick} point={el} />
                    </li>
                  )}
                </Draggable>
              ))}
            {providedDrop.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { PointList };
