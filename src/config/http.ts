import { clearSession } from "@/redux/slice/authen.slice";
import { refreshToken } from "@/services/authen.service";
import axios from "axios";
import { API } from "./api";
import { ACC_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./const";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const BY_PASS_URL = [API.LOGIN, API.REFRESH_TOKEN, API.LOGOUT];

export const setupAxiosInterceptor = (store: any) => {
    axios.interceptors.request.use((config) => {
        if (config.headers) {
            config.headers.Authorization = `Bearer ${localStorage.getItem(ACC_TOKEN_KEY)?.toString()}`;
        }
        return config;
    });

    axios.interceptors.response.use(
        (response) => response,
        async (err) => {
            const originRequest = err.config;
            // console.log("originRequest", originRequest);

            if (originRequest.url === API.REFRESH_TOKEN) {
                localStorage.removeItem(ACC_TOKEN_KEY);
                localStorage.removeItem(REFRESH_TOKEN_KEY);
                store.dispatch(clearSession());
            }

            if (err.response.status === 401 && !originRequest._retry && !BY_PASS_URL.includes(originRequest.url)) {
                originRequest._retry = true;
                await refreshToken();
                return axios(originRequest);
            }

            return Promise.reject(err);
        }
    );
};

export default axios;
