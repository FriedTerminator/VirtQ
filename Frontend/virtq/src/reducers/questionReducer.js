import { GET_QUESTION, GET_QUESTIONS, DELETE_QUESTION } from "../actions/types";

const initialState = {
    questionsList: [],
    currentQuestion: {}
};

export default function questionReducer(state = initialState, action) {
    switch(action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questionsList: action.payload
            };
        case GET_QUESTION:
            return {
                ...state,
                currentQuestion: action.payload
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questionsList: state.questionsList.filter(question => question.questionIdentifier !== action.payload)
            };
        default:
            return state;
    }
}