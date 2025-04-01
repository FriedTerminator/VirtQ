import axios from "axios";

const setJWTToken = token => {
  if (token) {
    // Set the Authorization header for all future requests
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Remove it if no token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setJWTToken;