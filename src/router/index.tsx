import { ROUTE } from "@/config/route";
import Layout from "@/layout";
import ErrorPage from "@/pages/error";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/not-found";

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectRoute } from "./protect-route";

const HomePage = React.lazy(() => import("@/pages/home"));
// use this make error useAppSelector not update state ?????
// const LoginPage = React.lazy(() => import("@/pages/login"));
const SignUpPage = React.lazy(() => import("@/pages/sign-up"));
const QuestionsPage = React.lazy(() => import("@/pages/question"));
const TestPage = React.lazy(() => import("@/pages/quiz"));
const CreateQuizPage = React.lazy(() => import("@/pages/create-quiz"));

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                { path: ROUTE.HOME, element: <HomePage /> }, //<ProtectRoute children={<HomePage />} /> },
                { path: ROUTE.LOGIN, element: <LoginPage /> },
                { path: ROUTE.SIGN_UP, element: <SignUpPage /> },
                { path: ROUTE.QUESTION, element: <ProtectRoute children={<QuestionsPage />} /> },
                { path: ROUTE.QUIZ, element: <ProtectRoute children={<TestPage />} /> },
                { path: ROUTE.CREATE_QUIZ, element: <ProtectRoute children={<CreateQuizPage />} /> }
            ]
        },
        {
            path: "*",
            element: <NotFoundPage />
        }
    ]);

    return <RouterProvider router={router} />;
};
export default Router;
