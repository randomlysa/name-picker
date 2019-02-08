import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import Results from '../results.js';

import * as mockData from '../../__mocks__/mockResultsData';

test('Loads with text: No results...', () => {
  const { getByText } = render(<Results />);
  getByText(/No results/i);
});

const props1 = {
  results: [],
  searched: false,
  saved: [],
  toggleSaveName: jest.fn()
};

const props2 = {
  results: mockData.results1_page1,
  searched: true,
  saved: [],
  toggleSaveName: jest.fn()
};

const props3 = {
  results: mockData.results2_page1,
  searched: true,
  saved: [],
  toggleSaveName: jest.fn()
};

test('Shows results (names) when given props', () => {
  const { getByText, rerender } = render(<Results {...props1} />);
  rerender(<Results {...props2} />);
  getByText(/Dixon/);
  getByText(/Maxwell/);
});

test('Shows different results (names) when given new props', () => {
  const { getByText, rerender } = render(<Results {...props1} />);
  rerender(<Results {...props3} />);
  getByText(/Armijo/i);
  // getByText(/Pixley/);
});
