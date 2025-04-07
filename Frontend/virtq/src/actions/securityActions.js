import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import {jwtDecode} from "jwt-decode";

export const createNewUser = (newUser, navigate) => async dispatch => {
    try {
        await axios.post("/api/users/signup", newUser);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        navigate("/login");
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const login = (LoginRequest, navigate) => async dispatch => {
    try {
      const res = await axios.post("/api/users/login", LoginRequest);
      const { token } = res.data;
  
      localStorage.setItem("jwtToken", token);
      setJWTToken(token);
  
      const decoded = jwtDecode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
  
      navigate("/dashboard"); // Only if you’re doing it here
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response?.data || {},
      });
    }
  };
  

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch(setCurrentUser({}));
  };