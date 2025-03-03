import axios from "axios";

const setJWTToken = token => {
    if(token) {
        axios.default.headers.common["Authorization"] = token;
    } else {
        delete axios.default.headers.common["Authorization"];
    }
};

export default setJWTToken;