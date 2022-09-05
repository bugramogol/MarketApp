
import { DECREASE, INCREMENT } from './actionTypes';

export default function basket(state = [], action) {
    
    switch (action.type) {
        case 'ADDTOBASKET':
            try {
                var index = state.findIndex(f => f.product == action.value)
                var tempState = state
                if (index > -1) {

                    var temp = tempState[index]
                    temp.count++;
                    if (index > -1) { // only splice array when item is found
                        tempState.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    tempState = [temp, ...tempState,]
                } else {
                    var item = { product: action.value, count: 1 }
                    tempState = [item, ...tempState,]
                }
            } catch (e) {

            }


            return tempState
        case 'REMOVEFROMBASKET':
            state = state - 1
            return state
        default:
            return state
    }
}