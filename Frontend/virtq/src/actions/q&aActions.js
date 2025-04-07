import axios from "axios";
import { GET_ERRORS, GET_QA, GET_QAS, DELETE_QA } from "./types";

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
        navigate("/dashboard");
    }
};

export const getQAS = () => async dispatch => {
    const res = await axios.get("/api/qa/all");
    dispatch({
        type: GET_QAS,
        payload: res.data
    });
};

export const deleteQA = id => async dispatch => {
    // Optimistically update UI
    dispatch({
      type: DELETE_QA,
      payload: id
    });
  
    try {
      await axios.delete(`/api/qa/${id}`);
    } catch (err) {
      console.error("❌ Failed to delete on server:", err.response?.data || err.message);
      // Optional: show an error toast or notification
      // Optional: re-fetch QAs or re-add this one to the list manually
    }
  };