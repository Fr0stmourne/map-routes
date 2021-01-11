import React, { HTMLAttributes } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MapMarker, Props } from '../../../components/MapMarker';

let fixture: Props;
const mockInfoWindowContent = 'point description';
const mockMarkerContent = 'test marker';

jest.mock('@react-google-maps/api', () => {
  return {
    InfoWindow: () => <div>{mockInfoWindowContent}</div>,
    Marker: ({ children, onClick }: HTMLAttributes<HTMLButtonElement>) => (
      <button type="button" onClick={onClick}>
        {mockMarkerContent}
        {children}
      </button>
    ),
  };
});

describe('MapMarker', () => {
  beforeEach(() => {
    fixture = {
      point: {
        id: '123',
        lat: 5.04,
        lng: 22.2,
        description: mockInfoWindowContent,
      },
      onMarkerDrag: jest.fn(),
    };
  });

  test('should hide description by default', () => {
    const { queryByText } = render(<MapMarker {...fixture} />);

    expect(queryByText(fixture.point.description)).not.toBeInTheDocument();
  });

  test('should show description on marker click', () => {
    const { queryByText } = render(<MapMarker {...fixture} />);

    fireEvent.click(screen.getByText(mockMarkerContent));

    expect(queryByText(mockInfoWindowContent)).toBeInTheDocument();
  });
});
