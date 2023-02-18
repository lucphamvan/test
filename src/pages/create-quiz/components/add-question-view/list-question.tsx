import { Card, Heading } from "@/components";
import { getQuestionsOfQuiz } from "@/services/quiz.service";
import { Box, Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { QuizContext } from "../..";

const ListQuestion = () => {
    const { quiz, questions, setQuestions, setCurrentQuestion } = useContext(QuizContext);

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
            <Stack>
                <Heading>{quiz?.setting.name}</Heading>
                <Stack gap="1rem">
                    {questions?.map((q) => (
                        <Box key={q.id} p="1rem" border="1px solid gray" onClick={() => setCurrentQuestion(q)}>
                            {q.content}
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </Card>
    );
};

export default ListQuestion;
