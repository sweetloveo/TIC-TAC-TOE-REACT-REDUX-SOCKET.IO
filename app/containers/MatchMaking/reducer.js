import {
    FOUND_OPPONENT,
    ERROR
} from "./constants"

let initialState = {
    foundOpponent: false,
    isOnlineMatch: false,
    error: false
}

export default function matchMakingReducer(state = initialState, action) {
    switch(action.type) {
        case 'FOUND_OPPONENTEIEI':
            return {...state, foundOpponent: true, isOnlineMatch: true}
        case ERROR:
            return {...state, error: true}
        default:
            return state
    }
}