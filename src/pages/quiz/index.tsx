import { BreadcumbLink, Card, Flex } from "@/components";
import { Breadcrumbs, CircularProgress, Pagination, Stack } from "@mui/material";
import DataTable from "react-data-table-component";
import { columns } from "./column";
import CreateQuizButton from "./components/create-quiz-button";
import useTest from "./useTest";

const TestPage = () => {
    const { tests, loading, refetchData, handlePageChange, pageCount } = useTest();
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
            <Card>
                <DataTable
                    columns={columns(refetchData)}
                    data={tests}
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

export default TestPage;
