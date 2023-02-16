import { API } from "@/config/api";
import { ACC_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/config/const";
import axios from "@/config/http";
import { CreateUserInput, User } from "@/types/user";

export const refreshToken = async () => {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY) || "";
    const accessToken = (await axios.post(API.REFRESH_TOKEN, { token })).data;
    localStorage.setItem(ACC_TOKEN_KEY, accessToken);
    return accessToken as string;
};

export const getUserInfo = async () => {
    const data = (await axios.get(API.ACCESS)).data;
    return data as User;
};

export const checUserExisted = async (email: string) => {
    const result = await axios.get(API.CHECK_USER_EXIST, {
        params: { email }
    });
    return result.data as boolean;
};

export const login = async (email: string, password: string) => {
    const response = await axios.get(API.LOGIN, {
        auth: { username: email, password: password }
    });
    const { access_token, refresh_token } = response.data;
    localStorage.setItem(ACC_TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
};

export const logOut = () => {
    localStorage.removeItem(ACC_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const signUp = (data: CreateUserInput) => {
    return axios.post(API.USERS, data);
};
