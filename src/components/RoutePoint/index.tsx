import block from 'bem-cn';
import React from 'react';
import './index.scss';

const b = block('route-point');

type Props = {
  text: string;
}

const RoutePoint = ({ text }: Props) => {
  return (
    <li className={b()}>{text}</li>
  )
}

export { RoutePoint };

