import axios from "axios";
import { GET_ERRORS, GET_QA, GET_QAS, DELETE_QA, GET_QA_BY_PASSCODE } from "./types";

export const createQA = (qa, navigate) => async dispatch => {
    try {
        const res = await axios.post("/api/qa", qa);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        navigate("/dashboard");
        return res;
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response?.data || { general: "An error ocurred." }
        });

        return null;
    }
};

export const getQA = (id, navigate) => async dispatch => {
    try {
        const res = await axios.get(`/api/qa/${id}`);
        dispatch({
            type: GET_QA,
            payload: res.data
        });
    } catch(error) {
        navigate("/");
    }
};

export const getQAS = () => async dispatch => {
    const res = await axios.get("/api/qa/all");
    const qas = Array.isArray(res.data) ? res.data : res.data.qas || [];
    dispatch({
        type: GET_QAS,
        payload: qas
    });
};

export const deleteQA = (id, navigate) => async dispatch => {
    dispatch({
      type: DELETE_QA,
      payload: id
    });
  
    try {
      await axios.delete(`/api/qa/${id}`);
    } catch (err) {
      console.error("Failed to delete on server:", err.response?.data || err.message);
      navigate("/dashboard");
    }
  };

  export const fetchQAByPasscode = (passcode) => async dispatch => {
  try {
    const res = await axios.get(`/api/questions/passcode/${passcode}`);
    dispatch({
      type: GET_QA_BY_PASSCODE,
      payload: res.data
    });
    return res;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data || {general: "Passcode lookup failed."}
    });
    throw err;
  }
};