import { Heading } from "@/components";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { QuizContext } from "../..";

const ListQuestion = () => {
    const { quiz } = useContext(QuizContext);
    return (
        <Stack>
            <Heading>{quiz?.setting.name}</Heading>
        </Stack>
    );
};

export default ListQuestion;
