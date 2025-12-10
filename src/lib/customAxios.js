import axios from "axios";

export const AxiosInstnce = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,

    },
})