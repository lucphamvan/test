import { useAppContext } from "@/hook/useAppContext";
import { getQuizzes } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { Quiz } from "@/types/quiz";
import { totalPage } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const LIMIT = 10;

const useQuiz = () => {
    const { notify } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [refresh, setRefresh] = useState(false);

    // get list test
    const getListTests = useCallback(
        async (limit: number, offset: number) => {
            try {
                setLoading(true);
                const response = await getQuizzes(limit, offset);
                setQuizzes(response.items);
                setPageCount(totalPage(response.total, limit));
            } catch (err: any) {
                notify("Failed to get list tests : " + err.message, NotifyType.error);
            } finally {
                setLoading(false);
            }
        },
        [notify]
    );

    // re-fetch data
    const refetchData = () => {
        setRefresh((value) => !value);
    };

    //  handle change page
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        // pagination start with page = 1
        setPage(value - 1);
    };

    //
    useEffect(() => {
        getListTests(LIMIT, page);
    }, [page, getListTests, refresh]);

    return { loading, quizzes, pageCount, refetchData, handlePageChange };
};

export default useQuiz;
