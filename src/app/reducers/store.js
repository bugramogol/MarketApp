import { configureStore } from '@reduxjs/toolkit';
import basket from './basket';
import price from './price';

export const store = configureStore({
  reducer: {
    price: price,
    basket: basket
  },
});
