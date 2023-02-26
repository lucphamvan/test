import { BreadcumbLink, Flex } from "@/components";
import { Breadcrumbs, Grid, Pagination, Stack } from "@mui/material";
import CreateQuizButton from "./components/create-quiz-button";
import QuizItem from "./quiz-item";
import useQuiz from "./useQuiz";

const QuizPage = () => {
    const { quizzes, handlePageChange, pageCount } = useQuiz();
    return (
        <Stack gap="1rem">
            <Breadcrumbs>
                <BreadcumbLink to="/">Home</BreadcumbLink>
                <BreadcumbLink to="/tests" color="#1A553C">
                    Test
                </BreadcumbLink>
            </Breadcrumbs>
            <Stack flexDirection="row" justifyContent="flex-end">
                <CreateQuizButton />
            </Stack>
            <Grid container spacing="2rem">
                {quizzes.map((quiz) => {
                    return <QuizItem quiz={quiz} key={quiz.id} />;
                })}
            </Grid>
            {/* <Flex py="0.5rem" justifyContent="end">
                <Pagination count={pageCount} onChange={handlePageChange} />
            </Flex> */}
        </Stack>
    );
};

export default QuizPage;
