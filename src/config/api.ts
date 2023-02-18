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
    INSERT_QUESTION_TO_QUIZ: (quizId: String) => `/quizzes/${quizId}/insert-question`
};
