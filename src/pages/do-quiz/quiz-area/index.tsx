import { Card, Countdown, Flex, Heading } from "@/components";
import { useAppContext } from "@/hook/useAppContext";
import useCountdown from "@/hook/useCountdown";
import { useDisclosure } from "@/hook/useDisclosure";
import { updateAnswer } from "@/services/quiz-answer.service";
import { NotifyType } from "@/types/general";
import { QuizAnswer } from "@/types/quiz";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Stack
} from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { ContentBox, TimeLeftText } from "./indesx.styled";
import MultiChoiceItems from "./multi-choice-items";
import SelectedChoices from "./selected-choices";
import SingleChoiceItems from "./single-choice-items";

interface QuizAreaProps {
    quizAnswer: QuizAnswer;
    setQuizAnswer: React.Dispatch<React.SetStateAction<QuizAnswer | undefined>>;
    onSubmitAnswer: () => Promise<void>;
}

const QuizArea: FC<QuizAreaProps> = ({ quizAnswer, setQuizAnswer, onSubmitAnswer }) => {
    const { day, hour, minute, second, timeLeft } = useCountdown(new Date(quizAnswer?.end_time));
    const { isOpen, onClose, onToggle } = useDisclosure();
    const { notify } = useAppContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const currentQuestionAnswer = quizAnswer.answers.at(currentIndex);

    // update selected choices
    const updateSelectedChoices = useCallback(
        (index: number, selected_choice_ids: string[]) => {
            setQuizAnswer((prevQuizAnswer) => {
                const newQuizAnswer = structuredClone(prevQuizAnswer) as QuizAnswer;
                newQuizAnswer.answers[index].selected_choice_ids = selected_choice_ids;
                return newQuizAnswer;
            });
            updateAnswer(quizAnswer.id, index, quizAnswer.email, selected_choice_ids);
        },
        [setQuizAnswer, quizAnswer.id, quizAnswer.email]
    );

    const handleSubmitAnswer = async () => {
        try {
            setIsSubmiting(true);
            await onSubmitAnswer();
            onClose();
            notify("Submit answer successfully", NotifyType.success);
        } catch (error) {
            console.log(error);
            notify("Submit answer failed", NotifyType.error);
        } finally {
            setIsSubmiting(false);
        }
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            onSubmitAnswer();
        }
    }, [timeLeft, onSubmitAnswer]);

    return (
        <Stack gap="1rem" sx={{ userSelect: "none" }}>
            <Stack alignItems="center">
                <TimeLeftText> Quiz End In</TimeLeftText>
                <Countdown day={day} hour={hour} minute={minute} second={second} />
            </Stack>
            <Grid container spacing="1rem">
                {/* ----------Left side-------------- */}
                <Grid item xs={12} lg={8}>
                    <Card p="1rem">
                        <Stack mt="0.5rem" spacing="0.5rem">
                            <Heading fontWeight={500}>{`Question ${currentIndex + 1}/${
                                quizAnswer.answers.length
                            }`}</Heading>
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
                    <Flex mt="1rem" justifyContent="space-between" gap="1rem">
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
                        <Button
                            variant="contained"
                            className="w-120"
                            onClick={onToggle}
                            style={{ backgroundColor: "tomato" }}
                        >
                            Submit
                        </Button>
                    </Flex>
                </Grid>

                {/* ----------Right side-------------- */}
                <Grid item xs={12} lg={4}>
                    <Card p="1rem">
                        <Heading mb="1rem">Questions</Heading>
                        <SelectedChoices setCurrentIndex={setCurrentIndex} quizAnswer={quizAnswer} />
                    </Card>
                </Grid>

                {/* ----------Submit dialog-------------- */}
                <Dialog open={isOpen} fullWidth>
                    <DialogTitle>SUBMIT ANSWER</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            After you submit your answers, you cannot do anything else. Are you sure you want to submit
                            your answers?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button autoFocus onClick={handleSubmitAnswer} disabled={isSubmiting}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Stack>
    );
};

export default QuizArea;
