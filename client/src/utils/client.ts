import axios from "axios";
import { API_URL } from "@/utils/constants";
import { getToken, setToken } from "@/utils/token";
import store from "./store";
import { unauthUser } from "@/modules/auth/authReducer";

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

client.interceptors.response.use(res => { return res; }, (err) => {
    if (axios.isAxiosError(err)) {
        const code = err.response?.status;
        if (code === 401) {
            store.dispatch(unauthUser());
            setToken(null);
        }
    }
    return Promise.reject(err);
})

export default client;
