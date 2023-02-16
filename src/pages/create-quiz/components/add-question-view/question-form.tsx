import EditQuestionForm from "@/components/edit-question";
import { Question } from "@/types/question";
import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { QuizContext } from "../..";

const QuestionForm = () => {
    const { quiz, questions } = useContext(QuizContext);
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(questions?.at(0));

    return <Box></Box>;
};

export default QuestionForm;
