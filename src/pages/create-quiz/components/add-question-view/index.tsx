import { Flex } from "@/components";
import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import { QuizContext } from "../..";
import { genQuestion } from "../../helper";
import AddQuestion from "./add-question";
import QuestionList from "./question-list";

interface Props {
    goNextStep: () => void;
    goPreviousStep: () => void;
}

const AddQuestionView = ({ goNextStep, goPreviousStep }: Props) => {
    const { setCurrentQuestion, resetRef } = useContext(QuizContext);

    const onAddQuestionBtnClick = () => {
        setCurrentQuestion(genQuestion());
        resetRef.current && resetRef.current();
    };

    return (
        <Grid container spacing="1rem">
            <Grid item xs={12} md={6}>
                <QuestionList />
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack gap="1rem">
                    <Button variant="contained" onClick={() => {}}>
                        Preview
                    </Button>
                    <Flex gap="1rem">
                        <Button sx={{ flexGrow: 1 }} variant="outlined" color="info" onClick={goPreviousStep}>
                            Back
                        </Button>
                        <Button sx={{ flexGrow: 1 }} variant="outlined" color="info" onClick={goNextStep}>
                            Next
                        </Button>
                    </Flex>
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
