import { Divider, Grid } from "@mui/material";
import React from "react";
import ListQuestion from "./list-question";

interface Props {
    goNextStep: () => void;
}

const AddQuestionView = ({ goNextStep }: Props) => {
    return (
        <Grid container spacing="1rem">
            <Grid item xs={12} md={7}></Grid>
            <Divider flexItem orientation="vertical" />
            <Grid item xs={12} md={4.9}>
                <ListQuestion />
            </Grid>
        </Grid>
    );
};

export default React.memo(AddQuestionView);
