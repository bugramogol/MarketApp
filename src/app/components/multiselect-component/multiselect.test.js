import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './../../reducers/store';
import MultiSelect from './multiselect';

const mockData = [{ name: "test" }];
const keyExpr = "name";
const displayExpr = "name";

test('Basket empty text is correct', () => {
    const { getByText } = render(
        <Provider store={store}>
            <MultiSelect items={mockData} keyExpr={keyExpr} displayExpr={displayExpr} />
        </Provider>
    );
    expect(getByText(/0/i)).toBeInTheDocument();
});
