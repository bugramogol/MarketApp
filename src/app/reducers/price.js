export default function price(state = 0, action) {
    switch (action.type) {
        case 'ADDITIONTOPRICE':
            state = state + action.value
            return state
        case 'EXTRACTIONFROMPRICE':
            state = state - action.value
            return state
        default:
            return state
    }
}