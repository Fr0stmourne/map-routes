import block from 'bem-cn';
import React, { FC, FormEvent, MouseEvent, useRef } from 'react';
import './index.scss';

export type Props = {
  placeholder?: string;
  onAddButtonClick: (value: string) => void;
};

const b = block('point-form');

const PointForm: FC<Props> = ({
  placeholder = 'Название точки',
  onAddButtonClick,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef && inputRef.current) {
      onAddButtonClick(inputRef.current.value);
    }
  };

  const handleButtonClick = (e: MouseEvent): void => {
    (e.target as HTMLInputElement).blur();
  };

  return (
    <form className={b()} onSubmit={handleInput}>
      <input
        name="point-input"
        className={b('input')}
        ref={inputRef}
        placeholder={placeholder}
        type="text"
        required
      />
      <button onClick={handleButtonClick} className={b('button')} type="submit">
        <svg className={b('add-icon')}>
          <use href="/assets/img/sprites/icons.svg#add" />
        </svg>
      </button>
    </form>
  );
};

export { PointForm };
