export interface Question {
    id: string;
    content: string;
    choices: Choice[];
    correct_choice_ids: string[];
    owner_id: string;
}

export interface Choice {
    id: string;
    content: string;
    isCorrect?: boolean;
}

export type CreateQuestionInput = Omit<Question, "id" | "owner_id">;
export type UpdateQuestionInput = CreateQuestionInput;
export type UpdateQuestionSchema = Omit<Question, "id" | "owner_id" | "correct_choice_ids">;

export interface GetQuestionsResponse {
    items: Question[];
    total: number;
}
