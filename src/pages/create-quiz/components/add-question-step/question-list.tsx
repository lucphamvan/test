import { Card, Heading } from "@/components";
import { useAppContext } from "@/hook/useAppContext";
import { useDisclosure } from "@/hook/useDisclosure";
import { getQuestionsOfQuiz, removeQuestionFromQuiz } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { Stack } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { QuizContext } from "../..";
import QuestionItem from "./question-item";
import RemoveDialog from "./remove-dialog";

interface Props {
    onOpenQuestionForm: () => void;
}
const QuestionList = ({ onOpenQuestionForm }: Props) => {
    const { notify } = useAppContext();
    const { quiz, questions, setQuestions } = useContext(QuizContext);
    const { isOpen, onClose, onToggle, onOpen } = useDisclosure(); // state of remove dialog
    const [removeQuestionId, setRemoveQuestionId] = useState<string>(); // id of question will be removed

    // get list question of quiz
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

    // render list question
    const renderQuestions = useCallback(() => {
        return questions.map((q, index) => (
            <QuestionItem
                question={q}
                index={index}
                key={`q-i-${q.id}`}
                setRemoveQuestionId={setRemoveQuestionId}
                showRemoveDialog={onOpen}
                onOpenQuestionForm={onOpenQuestionForm}
            />
        ));
    }, [questions, onOpen]);

    // handle remove question
    const onAcceptRemove = useCallback(async () => {
        if (!quiz?.id || !removeQuestionId) return;
        // remove question from quiz
        try {
            // call api to remove question from quiz
            await removeQuestionFromQuiz(quiz.id, removeQuestionId);
            // remove question from state
            setQuestions((prevQuestions) => {
                const _questions = prevQuestions.filter((q) => q.id !== removeQuestionId);
                return _questions;
            });
            // close dialog
            notify("Remove question successfull", NotifyType.success);
            onToggle();
        } catch (err: any) {
            notify("Failed to remove question : " + err.message, NotifyType.error);
            console.error("'removeQuestionFromQuiz' : ", err);
        }
    }, [onToggle, removeQuestionId, setQuestions, notify, quiz?.id]);

    return (
        <Card p="2rem">
            <Stack gap="1rem">
                <Heading>{quiz?.setting.name}</Heading>
                <Stack gap="1rem">{renderQuestions()}</Stack>
                <RemoveDialog isOpen={isOpen} onAccept={onAcceptRemove} onClose={onClose} />
            </Stack>
        </Card>
    );
};

export default QuestionList;
