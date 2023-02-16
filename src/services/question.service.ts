import { API } from "@/config/api";
import axios from "@/config/http";
import { CreateQuestionInput, GetQuestionsResponse, UpdateQuestionInput } from "@/types/question";

export const getQuestions = async (limit: number, offset: number) => {
    const response = await axios.get(API.QUESTIONS, {
        params: {
            limit,
            offset
        }
    });
    return response.data as GetQuestionsResponse;
};

export const createQuestion = async (input: CreateQuestionInput) => {
    const response = await axios.post(API.QUESTIONS, input);
    return response;
};

export const deleteQuestion = async (id: string) => {
    const response = await axios.delete(API.QUESTIONS + "/" + id);
    return response;
};

export const updateQuestion = async (id: string, input: UpdateQuestionInput) => {
    const response = await axios.patch(API.QUESTIONS + "/" + id, input);
    return response;
};
