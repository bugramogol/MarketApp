export default function price(state = 0, action) {
    switch (action.type) {
        case 'ADDITION':
            debugger
            var val = state + action.value
            return val
        case 'EXTRACTION':
            debugger
            var val = state - action.value
            return val
        default:
            return state
    }
}