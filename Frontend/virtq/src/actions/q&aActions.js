import axios from "axios";
import { GET_ERRORS, GET_QA, GET_QAS, DELETE_QA } from "./types";

export const createQA = (qa, history) => async dispatch => {
    try {
        await axios.post("http://localhost:8080/api/qa", qa);
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
    try {
        const res = await axios.get(`http://localhost:8080/api/qa/${id}`);
        dispatch({
            type: GET_QA,
            payload: res.data
        });
    } catch(error) {
        history.push("/dashboard");
    }
};

export const getQAS = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/api/qa/all");
    dispatch({
        type: GET_QAS,
        payload: res.data
    });
};

export const deleteQA = id => async dispatch => {
    if(window.confirm("Are you sure? This will delete your Q&A?")) {
        await axios.delete(`http://localhost:8080/api/qa/${id}`);
        dispatch({
            type: DELETE_QA,
            payload: id
        });
    }
};