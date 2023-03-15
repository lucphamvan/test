import { API } from "@/config/api";
import axios from "@/config/http";
import { CreateQuestionInput, Question } from "@/types/question";
import { GetQuizzesResponse, InsertQuestionResponse, InviteMailRequest, Quiz, QuizSetting } from "@/types/quiz";

export const getQuizzes = async (limit: number, offset: number) => {
    const response = await axios.get(API.QUIZZES, {
        params: {
            limit,
            offset
        }
    });
    return response.data as GetQuizzesResponse;
};

export const createQuiz = async (input: QuizSetting) => {
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

export const removeQuestionFromQuiz = async (quizId: string, questionId: string) => {
    const response = await axios.delete(API.REMOVE_QUESTION_FROM_QUIZ(quizId, questionId));
    return response.data as Question;
};

export const publishQuiz = async (quizId: string) => {
    const response = await axios.patch(API.PUBLISH_QUIZ(quizId));
    return response.data as Quiz;
};

export const getQuizInfo = async (quizId: string) => {
    const response = await axios.get(`${API.QUIZZES}/${quizId}`);
    return response.data as Quiz;
};

export const updateQuizSetting = async (quizId: string, input: QuizSetting) => {
    const response = await axios.patch(API.UPDATE_QUIZ_SETTING(quizId), input);
    return response.data as Quiz;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${API.QUIZZES}/${quizId}`);
    return response.data as Quiz;
};

export const inviteEmail = async (quizId: string, data: InviteMailRequest) => {
    const response = await axios.post(API.INVITE_EMAIL(quizId), data);
    return response.data as Quiz;
};
