import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/reducers/store';
import App from './App';
import { BrowserRouter } from "react-router-dom";

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});

test('renders contain components', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(getByText(/Sorting/i)).toBeInTheDocument();
  expect(getByText(/Brands/i)).toBeInTheDocument();
  expect(getByText(/Tags/i)).toBeInTheDocument();
  expect(getByText(/Products/i)).toBeInTheDocument();
});

