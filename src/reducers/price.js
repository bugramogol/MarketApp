
import { DECREASE, INCREMENT } from './actionTypes';


export default function price(state = 0, action) {
    switch (action.type) {
        case 'ADDITION':
            var val = state + action.value
            return val 
        case 'EXTRACTION':
            return state
        default:
            return state
    }
}