import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { PointForm } from '../../../components/PointForm';

let handleSubmit: jest.Mock;

const inputContent = 'Тестовая точка';

describe('PointForm', () => {
  beforeEach(() => {
    handleSubmit = jest.fn();
  });

  test('should check if input is required', () => {
    const { getByDisplayValue } = render(
      <PointForm onAddButtonClick={handleSubmit} />
    );

    const input = getByDisplayValue('');
    expect(input).toHaveAttribute('required');
  });

  test('should call the callback with user input', () => {
    const { getByDisplayValue } = render(
      <PointForm onAddButtonClick={handleSubmit} />
    );

    const input = getByDisplayValue('');
    fireEvent.focus(input);

    user.type(input, inputContent);
    fireEvent.submit(input);

    expect(handleSubmit).toBeCalledWith(inputContent);
  });
});
