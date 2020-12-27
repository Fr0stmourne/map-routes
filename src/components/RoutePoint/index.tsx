import block from 'bem-cn';
import React, { FC } from 'react';
import './index.scss';

const b = block('route-point');

type Props = {
  id: string;
  text: string;
  onDeleteButtonClick: (id: string) => void;
};

const RoutePoint: FC<Props> = ({ text, id, onDeleteButtonClick }: Props) => {
  return (
    <li className={b()}>
      {text}
      <button type="button" onClick={() => onDeleteButtonClick(id)}>
        Delete
      </button>
    </li>
  );
};

export { RoutePoint };
