/* eslint-disable no-undef */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MapMarker, Props } from '../../../components/MapMarker';

let fixture: Props;
jest.mock('@react-google-maps/api');

describe('MapMarker', () => {
  beforeEach(() => {
    fixture = {
      point: {
        id: '123',
        lat: 5.04,
        lng: 22.2,
        description: 'Test point',
      },
      onMarkerDrag: jest.fn(),
    };
  });

  test('should hide description by default', () => {
    const { queryByText } = render(<MapMarker {...fixture} />);

    expect(queryByText(fixture.point.description)).not.toBeInTheDocument();
  });

  test('should show', () => {
    const { queryByText } = render(<MapMarker {...fixture} />);

    // TODO

    // fireEvent.click

    // expect(queryByText(fixture.point.description)).not.toBeInTheDocument();
  });
});
