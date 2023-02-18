import { Card, Heading, QuestionForm } from "@/components";
import { useNotify } from "@/hook/useNotify";
import { updateQuestion } from "@/services/question.service";
import { insertQuestionToQuiz } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { CreateQuestionInput, Question } from "@/types/question";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { QuizContext } from "../..";

const AddQuestion = () => {
    const { quiz, setQuestions, currentQuestion, resetRef } = useContext(QuizContext);
    const notify = useNotify();
    const title = currentQuestion.id ? "Update question" : "New question";

    // create | edit questions
    const onSubmit = async (value: CreateQuestionInput) => {
        const correctIds = value.choices.filter((choice) => choice.isCorrect).map((choice) => choice.id);
        value.correct_choice_ids = correctIds;
        // case 1 : new question => add it to quiz
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
            const clone = structuredClone(questions) as Question[];
            const index = clone.findIndex((q) => q.id === currentQuestion.id);
            clone[index].content = value.content;
            clone[index].choices = value.choices;
            clone[index].correct_choice_ids = value.correct_choice_ids;
            return clone;
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

export default AddQuestion;
