import { Choice, Question } from "./question";

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

export interface InvitedData {
    email: string;
    name: string;
}

export interface InviteMailRequest {
    data: InvitedData[];
}

export interface InvitedEmail {
    email: string;
    name: string;
    quiz_id: string;
    id: string;
}

export interface QuizAnswerInfo {
    quiz_id: string;
    quiz_setting: QuizSetting;
    email: string;
    user_name: string;
    is_started: boolean;
}

export interface QuizAnswer {
    id: string;
    email: string;
    quiz_id: string;
    start_time: number;
    end_time: number;
    submitted: boolean;
    answers: Answer[];
}

// QuestionAnswer struct
export interface Answer {
    question_id: string;
    content: string;
    choices: Choice[];
    selected_choice_ids: string[];
    multiple_choice: boolean;
}
