import { Question } from "@/types/question";
import { Quiz } from "@/types/quiz";
import { Stack } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import AddQuestionStep from "./components/add-question-step";
import Breadcrumbs from "./components/breadcrumbs";
import CreateQuizStep from "./components/create-quiz-step";
import InviteStep from "./components/invite-step/invite-step";
import PublishStep from "./components/publish-step";
import StepProcess from "./components/step-process";
import { genQuestion } from "./helper";
// import mockQuiz from "./mock";

interface QuizContextProp {
    quiz: Quiz | undefined;
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
    currentQuestion: Question;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<Question>>;
    resetRef: React.MutableRefObject<any>;
}

export const QuizContext = React.createContext<QuizContextProp>({} as any);
const CreateQuizPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [quiz, setQuiz] = useState<Quiz>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(genQuestion());
    const resetRef = useRef<any>();

    const goNextStep = useCallback(() => {
        setActiveStep((step) => step + 1);
    }, [setActiveStep]);

    const goPreviousStep = useCallback(() => {
        setActiveStep((step) => step - 1);
    }, [setActiveStep]);

    return (
        <QuizContext.Provider
            value={{ quiz, questions, setQuestions, setQuiz, currentQuestion, setCurrentQuestion, resetRef }}
        >
            <Stack gap="1rem">
                <Breadcrumbs />
                <StepProcess activeStep={activeStep} />
                {activeStep === 0 && <CreateQuizStep goNextStep={goNextStep} />}
                {activeStep === 1 && <AddQuestionStep goPreviousStep={goPreviousStep} goNextStep={goNextStep} />}
                {activeStep === 2 && <PublishStep goPreviousStep={goPreviousStep} goNextStep={goNextStep} />}
                {activeStep === 3 && <InviteStep goNextStep={goNextStep} />}
            </Stack>
        </QuizContext.Provider>
    );
};

export default CreateQuizPage;
