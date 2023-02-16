import { API } from "@/config/api";
import axios from "@/config/http";
import { GetUsersResponse } from "@/types/user";

export const getUsers = async (limit: number, offset: number) => {
    const response = await axios.get(API.USERS, {
        params: {
            limit,
            offset
        }
    });
    return response.data as GetUsersResponse;
};
