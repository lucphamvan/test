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
        text: "Question",
        link: "/questions"
    },
    {
        text: "Calendar",
        link: "/calendar"
    }
];
