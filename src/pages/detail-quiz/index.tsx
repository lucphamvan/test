import { Heading } from "@/components";
import { getQuizInfo } from "@/services/quiz.service";
import { Question } from "@/types/question";
import { Quiz } from "@/types/quiz";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import { genQuestion } from "./helper";
import QuestionTab from "./question-tab";
import SettingTab from "./setting-tab";

interface QuizContextType {
    quiz: Quiz;
    setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    currentQuestion: Question;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<Question>>;
    resetRef: React.MutableRefObject<any>;
}

export const QuizContext = React.createContext<QuizContextType>({} as any);

const DetailQuiz = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [quiz, setQuiz] = useState<Quiz>();
    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(genQuestion());

    const resetRef = useRef<any>();
    const params = useParams<{ id: string }>();

    // get quiz info
    useEffect(() => {
        const getQuiz = async () => {
            if (!params?.id) return;
            try {
                const _quiz = await getQuizInfo(params.id);
                setQuiz(_quiz);
            } catch (error) {
                console.log("failed to get quiz with id : " + params.id);
            }
        };
        getQuiz();
        // clean up
        return () => {
            setQuiz(undefined);
        };
    }, [params.id]);

    // check quiz
    if (!quiz) {
        return <Heading>No quiz</Heading>;
    }

    return (
        <QuizContext.Provider
            value={{ quiz, setQuiz, questions, setQuestions, currentQuestion, setCurrentQuestion, resetRef }}
        >
            <Header tabIndex={tabIndex} setTabIndex={setTabIndex} />
            {tabIndex === 0 && <SettingTab />}
            {tabIndex === 1 && <QuestionTab />}
        </QuizContext.Provider>
    );
};
export default DetailQuiz;
