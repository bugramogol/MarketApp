import price from './price';
import basket from './basket';
import { combineReducers } from 'redux'

export default combineReducers({
    price,
    basket
});
