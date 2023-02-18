import { useNotify } from "@/hook/useNotify";
import { getQuestions } from "@/services/question.service";
import { NotifyType } from "@/types/general";
import { Question } from "@/types/question";
import { totalPage } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const LIMIT = 10;

const useQuestion = () => {
    const notify = useNotify();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [refresh, setRefresh] = useState(false);

    const refreshData = useCallback(() => {
        setRefresh((v) => !v);
    }, []);

    const getListUsers = useCallback(
        async (limit: number, offset: number) => {
            try {
                setLoading(true);
                const data = await getQuestions(limit, offset);
                data.items ? setQuestions(data.items) : setQuestions([]);
                setPageCount(totalPage(data.total, limit));
            } catch (error: any) {
                notify("Cannot get list users : " + error.message, NotifyType.error);
            } finally {
                setLoading(false);
            }
        },
        [notify]
    );

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    useEffect(() => {
        getListUsers(LIMIT, page);
    }, [page, getListUsers, refresh]);

    return {
        questions,
        loading,
        pageCount,
        refreshData,
        handlePageChange
    };
};

export default useQuestion;
