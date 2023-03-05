import { Card, Heading, QuestionForm } from "@/components";
import { useAppContext } from "@/hook/useAppContext";
import { updateQuestion } from "@/services/question.service";
import { insertQuestionToQuiz } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { CreateQuestionInput, Question } from "@/types/question";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { QuizContext } from "..";

interface Props {
    onCloseQuestionForm: () => void;
}
const AddQuestionForm = ({ onCloseQuestionForm }: Props) => {
    const { setQuestions, currentQuestion, resetRef } = useContext(QuizContext);
    const { notify } = useAppContext();
    const title = currentQuestion.id ? "Update question" : "Add new question";
    const param = useParams<{ id: string }>();

    // create | edit questions
    const onSubmit = async (value: CreateQuestionInput) => {
        const correctIds = value.choices.filter((choice) => choice.isCorrect).map((choice) => choice.id);
        value.correct_choice_ids = correctIds;
        // case 1 : insert new question to quiz
        if (!currentQuestion?.id) {
            const result = await insertQuestionToQuiz(param.id!, value);
            // update questions in state
            setQuestions((questions) => {
                const clone = structuredClone(questions) as Question[];
                clone.push(result.question);
                return clone;
            });
            window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: "smooth" });
            onCloseQuestionForm();
            notify("Insert question successfull", NotifyType.success);
            return;
        }

        // case 2: update question
        await updateQuestion(currentQuestion.id, value);
        // update questions in state
        setQuestions((questions) => {
            const _questions = structuredClone(questions) as Question[];
            const index = _questions.findIndex((q) => q.id === currentQuestion.id);
            if (index === -1) {
                return _questions;
            }
            _questions[index].content = value.content;
            _questions[index].choices = value.choices;
            _questions[index].correct_choice_ids = value.correct_choice_ids;
            return _questions;
        });
        onCloseQuestionForm();
        notify("Update question successfull", NotifyType.success);
    };

    return (
        <Card p="2rem">
            <Stack gap="1rem">
                <Heading>{title}</Heading>
                <QuestionForm onSubmit={onSubmit} question={currentQuestion!} resetRef={resetRef} />
            </Stack>
        </Card>
    );
};

export default AddQuestionForm;
