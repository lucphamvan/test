export enum API {
    // authen
    REFRESH_TOKEN = "/token/refresh",
    LOGIN = "/users/login",
    LOGOUT = "/users/logout",
    ACCESS = "/users/me",

    // users
    CHECK_USER_EXIST = "/users/check",
    USERS = "/users",
    QUESTIONS = "/questions",

    // quizzes
    QUIZZES = "/quizzes"
}
