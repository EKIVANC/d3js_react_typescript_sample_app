import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders App', () => {
  const {container} = render(<App />);
  const chartLayout = container.querySelector('div.chart-layout');
  expect(chartLayout).not.toBe(null);
});
