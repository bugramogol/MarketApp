import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './../../reducers/store';
import List from './list';

test('Basket empty text is correct', () => {
    const { getByText } = render(
        <Provider store={store}>
            <List />
        </Provider>
    );
});
