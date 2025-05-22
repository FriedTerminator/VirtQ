import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
    validToken: false,
    user: {}
}

export default function securityReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: Object.keys(action.payload).length !== 0,
                user: action.payload
            };
        default:
            return state;
    }
}