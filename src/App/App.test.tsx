import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders maze options dropdown', () => {
  const { getByText } = render(<App />);
  const selectElement = getByText(/Select maze/i);
  expect(selectElement).toBeInTheDocument();
});
