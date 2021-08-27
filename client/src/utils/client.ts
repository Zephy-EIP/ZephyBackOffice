import axios from "axios";
import { API_URL } from "./constants";
import { getToken } from "./token";

const client = axios.create({
    baseURL: API_URL
});

/// Automatically put the authorization token in request headers
client.interceptors.request.use(config => {
    let token = getToken();
    if (token !== null)
        config.headers.Authorization = token;
    return config;
});

export default client;
