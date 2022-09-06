export default function price(state = 0, action) {
    switch (action.type) {
        case 'ADDITION':
            state = state + action.value
            return state
        case 'EXTRACTION':
            state = state - action.value
            return state
        default:
            return state
    }
}