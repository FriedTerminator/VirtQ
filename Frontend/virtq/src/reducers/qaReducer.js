import { GET_QA, GET_QAS, DELETE_QA } from "../actions/types";

const initialState = {
    qaList: [],
    currentQA: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QAS:
            return {
                ...state,
                qaList: action.payload
            };
        case GET_QA:
            return {
                ...state,
                currentQA: action.payload
            };
        case DELETE_QA:
            return {
                ...state,
                qaList: state.qaList.filter(qa => qa.id !== action.payload)
            };
        default:
            return state;
    }
}