import { getQuizAnswer, getQuizAnswerInfo, submitAnswer } from "@/services/quiz-answer.service";
import { QuizAnswer, QuizAnswerInfo } from "@/types/quiz";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import ErrorCard from "./error-card";
import InfoCard from "./info-card";
import QuizArea from "./quiz-area";
import WelcomeCard from "./welcome-card";

const DoQuiz = () => {
    const { code } = useParams<{ code: string }>();
    const [quizInfo, setQuizInfo] = useState<QuizAnswerInfo>();
    const [quizAnswer, setQuizAnswer] = useState<QuizAnswer>();

    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // check quiz information before start quiz
    const getQuizInfo = async (code: string) => {
        try {
            const info = await getQuizAnswerInfo(code);
            if (info.is_started) {
                const data = await getQuizAnswer(code);
                setQuizAnswer(data);
            }
            setQuizInfo(info);
            setIsQuizStarted(info.is_started);
        } catch (error: any) {
            setIsValid(false);
            error?.response?.data?.error && setErrMsg(error?.response?.data?.error);
            console.log("failed to get quiz info", error);
        }
    };

    // get quiz answer to do quiz
    const getQuizAnswerToDo = async (code?: string) => {
        if (!code) return;
        try {
            const data = await getQuizAnswer(code);
            setQuizAnswer(data);
        } catch (error: any) {
            console.log("failed to get quiz answer", error);
        }
    };

    // on start quiz
    const onStartQuiz = () => {
        setIsQuizStarted(true);
        getQuizAnswerToDo(code);
    };

    // on submit answer
    const onSubmitAnswer = async () => {
        if (!quizAnswer) return;
        await submitAnswer(quizAnswer.id, quizAnswer.email);
        setIsSubmitted(true);
    };

    // ensure to get quiz info when code is changed
    useEffect(() => {
        if (!code) return;
        getQuizInfo(code);
    }, [code]);

    if (!isValid) return <ErrorCard errorMessage={errMsg} />;

    if (!isQuizStarted) return <WelcomeCard quizInfo={quizInfo} onStartQuiz={onStartQuiz} />;

    if (isSubmitted) return <InfoCard message="the quiz is submitted" />;

    if (!quizAnswer) return <div>Loading...</div>;

    return <QuizArea quizAnswer={quizAnswer} setQuizAnswer={setQuizAnswer} onSubmitAnswer={onSubmitAnswer} />;
};

export default DoQuiz;
