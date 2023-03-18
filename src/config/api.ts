export const API = {
    // authen
    REFRESH_TOKEN: "/token/refresh",
    LOGIN: "/users/login",
    LOGOUT: "/users/logout",
    ACCESS: "/users/me",

    // users
    CHECK_USER_EXIST: "/users/check",
    USERS: "/users",
    QUESTIONS: "/questions",

    // quizzes
    QUIZZES: "/quizzes",
    GET_QUIZ_QUESTIONS: (quizId: string) => `/quizzes/${quizId}/questions`,
    INSERT_QUESTION_TO_QUIZ: (quizId: string) => `/quizzes/${quizId}/insert-question`,
    REMOVE_QUESTION_FROM_QUIZ: (quizId: string, questionId: string) =>
        `/quizzes/${quizId}/remove-question/${questionId}`,
    PUBLISH_QUIZ: (quizId: string) => `/quizzes/${quizId}/publish`,
    UPDATE_QUIZ_SETTING: (quizId: string) => `/quizzes/${quizId}/update-setting`,
    INVITE_EMAIL: (quizId: string) => `/quizzes/${quizId}/invite-email`,
    INVITED_EMAILS: (quizId: string) => `/quizzes/${quizId}/invited-emails`,
    REMOVE_INVITED_EMAIL: (quizId: string, email: string) => `/quizzes/${quizId}/invited-emails?email=${email}`
};
