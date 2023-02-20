import { Card, Heading } from "@/components";
import { getQuestionsOfQuiz } from "@/services/quiz.service";
import { Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { QuizContext } from "../..";
import QuestionItem from "./question-item";

const QuestionList = () => {
    const { quiz, questions, setQuestions } = useContext(QuizContext);

    useEffect(() => {
        // get list question of quiz
        const getQuestions = async () => {
            try {
                const _questions = await getQuestionsOfQuiz(quiz?.id);
                if (_questions.length) {
                    setQuestions(_questions);
                }
            } catch (error) {
                console.error("'getQuizQuestions' : ", error);
            }
        };
        getQuestions();
    }, [quiz?.id, setQuestions]);

    return (
        <Card p="2rem">
            <Stack gap="1rem">
                <Heading>{quiz?.setting.name}</Heading>
                <Stack gap="1rem">
                    {questions?.map((q, index) => (
                        <QuestionItem question={q} index={index} key={`q-i-${q.id}`} />
                    ))}
                </Stack>
            </Stack>
        </Card>
    );
};

export default QuestionList;
