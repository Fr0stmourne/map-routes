import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Point, Props } from '../../../components/Point';

let fixture: Props;
let handleDeleteClick: jest.Mock;

describe('Point', () => {
  beforeEach(() => {
    handleDeleteClick = jest.fn();
    fixture = {
      point: {
        id: '123',
        lat: 5.04,
        lng: 22.2,
        description: 'Test point',
      },
      onDeleteButtonClick: handleDeleteClick,
    };
  });

  test('should render description', () => {
    const { getByText } = render(<Point {...fixture} />);

    expect(getByText(new RegExp(fixture.point.description))).toHaveTextContent(
      fixture.point.description
    );
  });

  test('should render coordinates "as is" if number of fraction digits is <= 4', () => {
    const { getByText } = render(<Point {...fixture} />);

    [fixture.point.lat, fixture.point.lng].forEach((coordinate) => {
      expect(getByText(new RegExp(String(coordinate)))).toHaveTextContent(
        String(coordinate)
      );
    });
  });

  test('should round length of coordinates to 4 fraction digits if there are more of them', () => {
    fixture = {
      point: {
        id: '123',
        lat: 5.0412934140142,
        lng: 22.214313432141234,
        description: 'Test point',
      },
      onDeleteButtonClick: handleDeleteClick,
    };
    const { queryByText } = render(<Point {...fixture} />);

    expect(queryByText(/5.0413/g)).toBeInTheDocument();
    expect(queryByText(/22.2143/g)).toBeInTheDocument();
  });

  test('should call the handler on delete button click', () => {
    const { getByLabelText } = render(<Point {...fixture} />);
    const deleteButton = getByLabelText('Удалить');

    fireEvent.click(deleteButton);
    expect(handleDeleteClick).toHaveBeenCalledTimes(1);
  });
});
