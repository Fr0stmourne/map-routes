import React, { FC, FormEvent, useRef } from 'react';

type Props = {
  onAddButtonClick: (value: string) => void;
};

const Input: FC<Props> = React.memo(({ onAddButtonClick }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef && inputRef.current) onAddButtonClick(inputRef.current.value);
  };

  return (
    <form onSubmit={handleInput}>
      <input ref={inputRef} type="text" required />
      <button type="submit">Добавить</button>
    </form>
  );
});

export { Input };
