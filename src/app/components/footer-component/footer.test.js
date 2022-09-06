import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './../../reducers/store';
import Footer from './footer';

test('Basket empty text is correct', () => {
    const { getByText } = render(
        <Provider store={store}>
            <Footer />
        </Provider>
    );
    expect(getByText(/©2019 Market/i)).toBeInTheDocument();
    expect(getByText(/•/i)).toBeInTheDocument();
    expect(getByText(/Privacy Policy/i)).toBeInTheDocument();
});
