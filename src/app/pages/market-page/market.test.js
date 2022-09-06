import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../reducers/store';
import Market from './market';

test('Basket empty text is correct', () => {
    const { getByText } = render(
        <Provider store={store}>
            <Market />
        </Provider>
    );
    expect(getByText(/Products/i)).toBeInTheDocument();
    expect(getByText(/Mug/i)).toBeInTheDocument();
    expect(getByText(/Shirt/i)).toBeInTheDocument();
});
