import { Card, Heading, QuestionForm } from "@/components";
import { useNotify } from "@/hook/useNotify";
import { updateQuestion } from "@/services/question.service";
import { insertQuestionToQuiz } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { CreateQuestionInput, Question } from "@/types/question";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { QuizContext } from "../..";

const AddQuestionForm = () => {
    const { quiz, setQuestions, currentQuestion, resetRef } = useContext(QuizContext);
    const notify = useNotify();
    const title = currentQuestion.id ? "Update question" : "Add new question";

    // create | edit questions
    const onSubmit = async (value: CreateQuestionInput) => {
        const correctIds = value.choices.filter((choice) => choice.isCorrect).map((choice) => choice.id);
        value.correct_choice_ids = correctIds;
        // case 1 : insert new question to quiz
        if (!currentQuestion?.id) {
            const result = await insertQuestionToQuiz(quiz!.id, value);
            setQuestions((questions) => {
                const clone = structuredClone(questions) as Question[];
                clone.push(result.question);
                return clone;
            });
            notify("Insert question successfull", NotifyType.success);
            return;
        }

        // case 2: update question
        await updateQuestion(currentQuestion.id, value);
        setQuestions((questions) => {
            const _questions = structuredClone(questions) as Question[];
            const index = _questions.findIndex((q) => q.id === currentQuestion.id);
            _questions[index].content = value.content;
            _questions[index].choices = value.choices;
            _questions[index].correct_choice_ids = value.correct_choice_ids;
            return _questions;
        });
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
