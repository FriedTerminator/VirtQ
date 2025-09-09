import axios from "axios";
import { GET_QUESTIONS, GET_QUESTION, DELETE_QUESTION, GET_ERRORS } from "./types";

export const createQuestion = (qaId, question, navigate) => async dispatch => {
    try {
        const check = await dispatch(checkQuestion(qaId, question.text));
        if (check && check.related === false) {
            dispatch({
                type: GET_ERRORS,
                payload: { text: check.reason || "Question appears off-topic."},
            });
            return null;
        }

        const res = await axios.post(`/api/questions/${qaId}`, question);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        return res.data;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response?.data || { general: "An error ocurred." }
        });

        return null;
    }
};

export const getQuestion = (passcode, navigate) => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/passcode/${passcode}`);
        dispatch({
            type: GET_QUESTION,
            payload: res.data
        });
    } catch(error) {
        navigate("/dashboard");
    }
};

export const getQuestions = (qaId) => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/qa/${qaId}`);
        console.log("Loaded questions from API: ", res.data);
        dispatch({
            type: GET_QUESTIONS,
            payload: res.data
        });
    } catch (error) {
        console.error("Failed to fetch questions:", error.response?.data || error.message);
    }
};

export const deleteQuestion = (questionId) => async dispatch => {
    try {
      await axios.delete(`/api/questions/${questionId}`);

      dispatch({
      type: DELETE_QUESTION,
      payload: questionId
    });
    } catch (error) {
      console.error("Failed to delete on server:", error.response?.data || error.message);
    }
  };

export const checkQuestion = (qaIdentifier, text, topicOverride) => async dispatch => {
    try {
        const body = { text, topicOverride };
        const res = await axios.post(`/api/questions/${qaIdentifier}/check`, body);

        return res.data;
    } catch(error) {
        const payload = error.response?.data || { general: "Failed to check question."};
        dispatch({ type: GET_ERRORS, payload });
        return null;
    }
};