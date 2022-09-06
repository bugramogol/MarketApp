import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './../../reducers/store';
import Header from './header';

test('Basket empty text is correct', () => {
    const { getByText } = render(
        <Provider store={store}>
            <Header />
        </Provider>
    );
    expect(getByText(/-/i)).toBeInTheDocument();
});
