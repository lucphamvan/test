import { Card, Flex } from "@/components";
import { QuizAnswer } from "@/types/quiz";
import { Box, Button, Grid, Stack } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { ContentBox } from "./indesx.styled";
import MultiChoiceItems from "./multi-choice-items";
import SingleChoiceItems from "./single-choice-items";

interface QuizAreaProps {
    quizAnswer: QuizAnswer;
    setQuizAnswer: React.Dispatch<React.SetStateAction<QuizAnswer | undefined>>;
}

const QuizArea: FC<QuizAreaProps> = ({ quizAnswer, setQuizAnswer }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestionAnswer = quizAnswer.answers.at(currentIndex);

    // update selected choices
    const updateSelectedChoices = useCallback(
        (index: number, selected_choice_ids: string[]) => {
            setQuizAnswer((prevQuizAnswer) => {
                const newQuizAnswer = structuredClone(prevQuizAnswer) as QuizAnswer;
                newQuizAnswer.answers[index].selected_choice_ids = selected_choice_ids;
                return newQuizAnswer;
            });
        },
        [setQuizAnswer]
    );

    return (
        <Grid container>
            <Grid item xs={12} lg={8} sx={{ userSelect: "none" }}>
                <Box mb="4px">{`Question ${currentIndex + 1}`}</Box>
                <Card p="1rem">
                    <Stack mt="0.5rem" spacing="0.5rem">
                        <ContentBox>{currentQuestionAnswer?.content} ?</ContentBox>
                        <Grid container rowGap="0.5rem">
                            {currentQuestionAnswer?.multiple_choice ? (
                                <MultiChoiceItems
                                    questionAnswer={currentQuestionAnswer}
                                    updateSelectedChoices={updateSelectedChoices}
                                    currentIndex={currentIndex}
                                />
                            ) : (
                                <SingleChoiceItems
                                    updateSelectedChoices={updateSelectedChoices}
                                    questionAnswer={currentQuestionAnswer}
                                    currentIndex={currentIndex}
                                />
                            )}
                        </Grid>
                    </Stack>
                </Card>
                {/* ----------Next/Back button-------------- */}
                <Flex mt="1rem" justifyContent="flex-end">
                    <Flex gap="1rem">
                        <Button
                            variant="outlined"
                            className="w-120"
                            disabled={currentIndex === 0}
                            onClick={() => setCurrentIndex(currentIndex - 1)}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            className="w-120"
                            disabled={currentIndex === quizAnswer.answers.length - 1}
                            onClick={() => setCurrentIndex(currentIndex + 1)}
                        >
                            Next
                        </Button>
                    </Flex>
                </Flex>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Card></Card>
            </Grid>
        </Grid>
    );
};

export default QuizArea;
