export interface MenuItem {
    text: string;
    icon?: string;
    link: string;
    children?: MenuItem[];
}

export const menu: MenuItem[] = [
    {
        text: "Home",
        link: "/"
    },
    {
        text: "Quiz",
        link: "/quizzes"
    },
    {
        text: "Create Quiz",
        link: "/create-quiz"
    },
    {
        text: "Calendar",
        link: "/calendar"
    }
];
