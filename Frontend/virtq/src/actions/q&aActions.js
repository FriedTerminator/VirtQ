import axios from "axios";
import { GET_ERRORS, GET_QA, GET_QAS, DELETE_QA } from "./types";

export const createQA = (qa, history) => async dispatch => {
    try {
        await axios.post("/api/q&a", qa);
        history.push("/dashboard")
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getQA = (id, history) => async dispatch => {
    const res = await axios.get(`/api/q&a/${id}`);
    dispatch({
        type: GET_ERRORS,
        payload: res.data
    });
};

export const deleteQA = id => async dispatch => {
    if(window.confirm("Are you sure? This will delete your Q&A?")) {
        await axios.delete(`/api/q&a/${id}`);
        dispatch({
            type: DELETE_QA,
            payload: id
        });
    }
};