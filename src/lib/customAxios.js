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

export const teamUtils = {
    setTeamId: (teamId) => {
        localStorage.setItem("team_id", teamId.toString());
    },
    getTeamId: () => {
        return localStorage.getItem("team_id");
    },
    removeTeamId: () => {
        localStorage.removeItem("team_id");
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

        // teamId는 JWT 토큰에 포함되어 있으므로 별도 헤더로 전송하지 않음
        // 백엔드에서 CORS 정책상 커스텀 헤더를 허용하지 않음

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

