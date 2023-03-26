import { getQuizAnswerInfo } from "@/services/quiz-answer.service";
import { QuizAnswerInfo } from "@/types/quiz";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorCard from "./error-card";
import InfoCard from "./info-card";

const DoQuiz = () => {
    const { code } = useParams<{ code: string }>();
    const [quizInfo, setQuizInfo] = useState<QuizAnswerInfo>();
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isValidCode, setIsValidCode] = useState(true);

    const getQuizAnswerInfomation = async (code: string) => {
        try {
            const data = await getQuizAnswerInfo(code);
            setQuizInfo(data);
        } catch (error: any) {
            setIsValidCode(false);
            console.log("failed to get quiz info", error);
        }
    };

    useEffect(() => {
        if (!code) return;
        getQuizAnswerInfomation(code);
    }, [code]);

    if (!isValidCode) {
        return <ErrorCard />;
    }

    if (!isQuizStarted) {
        return <InfoCard quizInfo={quizInfo} />;
    }

    return <></>;
};

export default DoQuiz;
