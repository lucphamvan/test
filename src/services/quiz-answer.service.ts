import { API } from "@/config/api";
import axios from "@/config/http";
import { QuizAnswer, QuizAnswerInfo } from "@/types/quiz";

export const getQuizAnswerInfo = async (code: string) => {
    const response = await axios.get(API.GET_QUIZ_ANSWER_INFO(code));
    return response.data as QuizAnswerInfo;
};

export const getQuizAnswer = async (code: string) => {
    const response = await axios.get(API.GET_QUIZ_ANSWER(code));
    return response.data as QuizAnswer;
};

export const updateAnswer = async (id: string, index: number, selectedChoiceIds = []) => {
    const response = await axios.put(API.UPDATE_ANSWER(id), { index, selectedChoiceIds });
    return response.data as QuizAnswer;
};
