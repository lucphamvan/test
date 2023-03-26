import { API } from "@/config/api";
import axios from "@/config/http";
import { QuizAnswerInfo } from "@/types/quiz";

export const getQuizAnswerInfo = async (code: string) => {
    const response = await axios.get(API.GET_QUIZ_ANSWER_INFO(code));
    return response.data as QuizAnswerInfo;
};
