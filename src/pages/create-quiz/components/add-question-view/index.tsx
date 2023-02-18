import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import { QuizContext } from "../..";
import { genQuestion } from "../../helper";
import AddQuestion from "./add-question";
import ListQuestion from "./list-question";

interface Props {
    goNextStep: () => void;
}

const AddQuestionView = ({ goNextStep }: Props) => {
    const { setCurrentQuestion, resetRef } = useContext(QuizContext);

    const onAddQuestionBtnClick = () => {
        setCurrentQuestion(genQuestion());
        resetRef.current && resetRef.current();
    };

    return (
        <Grid container spacing="1rem">
            <Grid item xs={12} md={6}>
                <ListQuestion />
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack gap="1rem">
                    <Button variant="contained" onClick={goNextStep}>
                        Publish
                    </Button>
                    <Button variant="outlined" onClick={onAddQuestionBtnClick}>
                        Add question
                    </Button>
                    <AddQuestion />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default React.memo(AddQuestionView);
