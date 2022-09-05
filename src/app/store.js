import { configureStore } from '@reduxjs/toolkit';
import basket from '../reducers/basket';
import price from '../reducers/price';


export const store = configureStore({
  reducer: {
    price: price,
    basket: basket
  },
});
