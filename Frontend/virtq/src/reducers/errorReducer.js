import { CLEAR_ERRORS, GET_ERRORS } from "../actions/types";

const initialState = {};

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}