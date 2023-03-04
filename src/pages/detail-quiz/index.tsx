import { Heading } from "@/components";
import { getQuizInfo } from "@/services/quiz.service";
import { Quiz } from "@/types/quiz";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import SettingTab from "./setting-tab";

const DetailQuiz = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [quiz, setQuiz] = useState<Quiz>();
    const params = useParams<{ id: string }>();

    // get quiz info
    useEffect(() => {
        const getQuiz = async () => {
            if (!params?.id) return;
            try {
                const _quiz = await getQuizInfo(params.id);
                setQuiz(_quiz);
            } catch (error) {
                console.log("failed to get quiz with id : " + params.id);
            }
        };
        getQuiz();
        // clean up
        return () => {
            setQuiz(undefined);
        };
    }, [params.id]);

    // check quiz
    if (!quiz) {
        return <Heading>No quiz</Heading>;
    }

    return (
        <>
            <Header tabIndex={tabIndex} setTabIndex={setTabIndex} />
            {tabIndex === 0 && <SettingTab quiz={quiz} setQuiz={setQuiz} />}
        </>
    );
};
export default DetailQuiz;
