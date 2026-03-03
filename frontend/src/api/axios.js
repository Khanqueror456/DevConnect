import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials : UNSAFE_getTurboStreamSingleFetchDataStrategy, // Required for cookie-based auth
});

export default api;