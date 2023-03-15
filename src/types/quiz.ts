import { Question } from "./question";

export interface Quiz {
    id: string;
    setting: QuizSetting;
    code: string;
    published: boolean;
    question_ids: string[];
    created_at: number;
}

export interface QuizSetting {
    name: string;
    allowed_emails?: string[];
    duration: number; // second
    end_time: number; // milisecond
    start_time: number; // milisecond
}

export interface GetQuizzesResponse {
    items: Quiz[];
    total: number;
}

export interface InsertQuestionResponse {
    quiz: Quiz;
    question: Question;
}

export interface EmailData {
    email: string;
    name: string;
}

export interface InviteMailRequest {
    data: EmailData[];
}
