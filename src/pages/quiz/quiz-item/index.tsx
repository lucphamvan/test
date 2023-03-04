import { ROUTE } from "@/config/route";
import { Quiz } from "@/types/quiz";
import { Box, Grid, Stack } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Badge, QuizCard, QuizTitle } from "./index.styled";

const getTime = (time: number) => {
    const date = moment(time);
    return date.format("DD/MM/YYYY");
};

interface QuizItemProps {
    quiz: Quiz;
}
const QuizItem = ({ quiz }: QuizItemProps) => {
    const navigate = useNavigate();

    const goDetailQuiz = () => {
        navigate(`/${ROUTE.DETAIL_QUIZ}/${quiz.id}`);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <QuizCard onClick={goDetailQuiz}>
                <Stack gap="0.5rem" position="relative">
                    <QuizTitle>{quiz.setting.name}</QuizTitle>
                    <Box>Duration: {quiz.setting.duration} minute</Box>
                    <Box>Start time: {getTime(quiz.setting.start_time)}</Box>
                    <Box>End time: {getTime(quiz.setting.end_time)}</Box>
                    <Badge>{quiz.published ? "Published" : "Non published"}</Badge>
                </Stack>
            </QuizCard>
        </Grid>
    );
};
export default QuizItem;
