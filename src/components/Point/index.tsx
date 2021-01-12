import block from 'bem-cn';
import React, { FC } from 'react';
import { testIDs } from '../../testIDs';
import { DeleteClickHandler, MapPoint } from '../../models/models';
import { formatCoordinate } from '../../utils/ts/formatCoordinate';
import './index.scss';

const b = block('route-point');

export type Props = {
  point: MapPoint;
  onDeleteButtonClick: DeleteClickHandler;
};

const Point: FC<Props> = ({
  point: { id, lat, lng, description },
  onDeleteButtonClick,
}: Props) => {
  return (
    <div className={b()}>
      <div className={b('info')}>
        <h3 className={b('title')}>{description}</h3>
        <p className={b('coordinates')}>{`${formatCoordinate(
          lat
        )}, ${formatCoordinate(lng)}`}</p>
      </div>
      <button
        className={b('delete')}
        type="button"
        data-testid={testIDs.delete}
        aria-label="Удалить"
        onClick={() => onDeleteButtonClick(id)}
      >
        <svg className={b('delete-icon')}>
          <use href="/assets/img/sprites/icons.svg#trash" />
        </svg>
      </button>
    </div>
  );
};

export { Point };
