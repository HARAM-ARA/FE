import axios from "axios";

export const tokenUtils = {
    setToken: (token) => {
        localStorage.setItem("auth_token", token);
    },
    getToken: () => {
        return localStorage.getItem("auth_token");
    },
    removeToken: () => {
        localStorage.removeItem("auth_token");
    }
};

export const AxiosInstnce = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
});

AxiosInstnce.interceptors.request.use(
    (config) => {
        const token = tokenUtils.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

