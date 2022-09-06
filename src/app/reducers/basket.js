export default function basket(state = [], action) {

    switch (action.type) {
        case 'ADDPRODUCTTOBASKET':
            var tempState = state
            try {
                /* If the product exist in basket, it will be removed and will added as first element with updated count */
                /* If the product not exist in a basket, it will be added to basket*/
                var indexOfStateElement = state.findIndex(f => f.product === action.value)
                if (indexOfStateElement > -1) {

                    var tempProduct = tempState[indexOfStateElement]
                    tempProduct.count++;
                    if (indexOfStateElement > -1) { // only splice array when item is found
                        tempState.splice(indexOfStateElement, 1); // remove only one item
                    }
                    tempState = [tempProduct, ...tempState]
                } else {
                    var item = { product: action.value, count: 1 }
                    tempState = [item, ...tempState]
                }
            } catch (e) {

            }
            return [...tempState]
        case 'DELETEPRODUCTFROMBASKET':
            tempState = state
            tempState.splice(action.value, 1);
            return [...tempState]
        case 'UPDATECOUNTOFPRODUCTSBYINDEX':
            state[action.value.index].count = action.value.value
            return [...state]

        default:
            return state
    }
}

