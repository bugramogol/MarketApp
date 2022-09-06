import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './../../reducers/store';
import Productcard from './productcard';

const mockData = {
    "tags": [
        "Trees"
    ],
    "price": 10.99,
    "name": "Handcrafted Trees Mug",
    "description": "test description",
    "slug": "Handcrafted-Trees-Mug",
    "added": 1485723766805,
    "manufacturer": "OHara-Group",
    "itemType": "mug"
}
test('Basket empty text is correct', () => {
    const { getByText } = render(
        <Provider store={store}>
            <Productcard product={mockData} />
        </Provider>
    );
    expect(getByText(/Add/i)).toBeInTheDocument();
});
