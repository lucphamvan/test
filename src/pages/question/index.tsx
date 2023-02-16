import { BreadcumbLink, Card, Flex } from "@/components";
import { Breadcrumbs, CircularProgress, Pagination, Stack } from "@mui/material";
import DataTable from "react-data-table-component";
import { columns } from "./column";
import CreateQuestionButton from "./components/create-question";
import useQuestion from "./useQuestion";

const QuestionPage = () => {
    const { questions, refreshData, pageCount, loading, handlePageChange } = useQuestion();

    return (
        <Stack gap="1rem">
            <Breadcrumbs>
                <BreadcumbLink to="/">Home</BreadcumbLink>
                <BreadcumbLink to="/questions" color="#1A553C">
                    Question
                </BreadcumbLink>
            </Breadcrumbs>
            <Stack flexDirection="row" justifyContent="flex-end">
                <CreateQuestionButton refreshData={refreshData} />
            </Stack>
            <Card>
                <DataTable
                    columns={columns(refreshData)}
                    data={questions}
                    progressPending={loading}
                    progressComponent={<CircularProgress style={{ marginTop: "1rem" }} />}
                />
                <Flex py="0.5rem" justifyContent="end">
                    <Pagination count={pageCount} onChange={handlePageChange} />
                </Flex>
            </Card>
        </Stack>
    );
};
export default QuestionPage;
