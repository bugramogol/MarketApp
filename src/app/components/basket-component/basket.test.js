import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './../../reducers/store';
import Basket from './basket';

test('Basket empty text is correct', () => {
    const { getByText } = render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );
    expect(getByText(/Your basket is empty/i)).toBeInTheDocument();
    expect(getByText(/Add items to your cart to order/i)).toBeInTheDocument();
});
