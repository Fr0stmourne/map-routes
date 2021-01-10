import React from 'react';
import { render } from '@testing-library/react';
import { PointList, Props } from '../../../components/PointList';

let fixture: Props;

describe('PointList', () => {
  beforeEach(() => {
    fixture = {
      mapPoints: [
        { id: '1', lat: 2, lng: 10, description: 'test point 1' },
        { id: '2', lat: 2, lng: 10, description: 'test point 2' },
        { id: '3', lat: 2, lng: 10, description: 'test point 3' },
      ],
      onDragEnd: jest.fn(),
      onDeleteClick: jest.fn(),
    };
  });

  test('should render all list items', () => {
    const { getAllByText } = render(<PointList {...fixture} />);

    expect(getAllByText(/test point/gi).length).toEqual(
      fixture.mapPoints.length
    );
  });
});
