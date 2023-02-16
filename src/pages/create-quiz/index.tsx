import { Card } from "@/components";
import { Question } from "@/types/question";
import { Quiz } from "@/types/quiz";
import { Stack } from "@mui/material";
import React, { useCallback, useState } from "react";
import AddQuestionView from "./components/add-question-view";
import Breadcrumbs from "./components/breadcrumbs";
import CreateQuizView from "./components/create-quiz-view";
import StepProcess from "./components/step-process";
import mockQuiz from "./mock";

interface QuizContextProp {
    quiz: Quiz | undefined;
    questions: Question[];
    setQuestions?: React.Dispatch<React.SetStateAction<Question[]>>;
    setQuiz?: React.Dispatch<React.SetStateAction<Quiz>>;
}

export const QuizContext = React.createContext<QuizContextProp>({ quiz: undefined, questions: [] });
const CreateQuizPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [quiz, setQuiz] = useState<Quiz>(mockQuiz);
    const [questions, setQuestions] = useState<Question[]>([]);

    const goNextStep = useCallback(() => {
        setActiveStep((step) => step + 1);
    }, [setActiveStep]);

    return (
        <QuizContext.Provider value={{ quiz, questions, setQuestions, setQuiz }}>
            <Stack gap="1rem">
                <Breadcrumbs />
                <StepProcess activeStep={activeStep} />
                <Card p="2rem">
                    {activeStep === 0 && <CreateQuizView goNextStep={goNextStep} />}
                    {activeStep === 1 && <AddQuestionView goNextStep={goNextStep} />}
                </Card>
            </Stack>
        </QuizContext.Provider>
    );
};

export default CreateQuizPage;
