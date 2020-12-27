import block from 'bem-cn';
import React, { FC } from 'react';
import './index.scss';

const b = block('route-point');

type Props = {
  text: string;
};

const RoutePoint: FC<Props> = ({ text }: Props) => {
  return <li className={b()}>{text}</li>;
};

export { RoutePoint };
