import { API } from "@/config/api";
import axios from "@/config/http";
import { CreateQuizInput, GetQuizzesResponse, Quiz } from "@/types/quiz";

export const getQuizzes = async (limit: number, offset: number) => {
    const response = await axios.get(API.QUIZZES, {
        params: {
            limit,
            offset
        }
    });
    return response.data as GetQuizzesResponse;
};

export const createQuiz = async (input: CreateQuizInput) => {
    const response = await axios.post(API.QUIZZES, input);
    return response.data as Quiz;
};
