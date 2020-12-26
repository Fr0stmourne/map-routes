import block from 'bem-cn';
import React, { FC } from 'react';
import { RoutePoint } from './components/RoutePoint';

const b = block('app');

const App: FC = () => {
  return (
    <div className={b()}>
      <ul className={b('list')}>
        {[1, 2, 3].map((el) => (
          <RoutePoint key={el} text={String(el)} />
        ))}
      </ul>
    </div>
  );
};

export default App;
