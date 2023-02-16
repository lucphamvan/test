export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
}

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
    avatar?: string;
}

export interface GetUsersResponse {
    items: User[];
    total: number;
}
