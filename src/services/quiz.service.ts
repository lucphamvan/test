import { API } from "@/config/api";
import axios from "@/config/http";
import { CreateQuestionInput, Question } from "@/types/question";
import { CreateQuizInput, GetQuizzesResponse, InsertQuestionResponse, Quiz } from "@/types/quiz";

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

export const getQuestionsOfQuiz = async (quizId?: string) => {
    if (!quizId) {
        return [];
    }
    const response = await axios.get(API.GET_QUIZ_QUESTIONS(quizId));
    return response.data as Question[];
};

export const insertQuestionToQuiz = async (quizId: string, input: CreateQuestionInput) => {
    const response = await axios.patch(API.INSERT_QUESTION_TO_QUIZ(quizId), input);
    return response.data as InsertQuestionResponse;
};
