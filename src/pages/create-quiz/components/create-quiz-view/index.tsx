import { Card } from "@/components";
import { useNotify } from "@/hook/useNotify";
import { createQuiz } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { CreateQuizInput } from "@/types/quiz";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import React, { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { QuizContext } from "../..";

// schema for create quiz
const schema = yup.object().shape({
    setting: yup.object().shape({
        duration: yup.number().required("Duration is required field").min(1, "Duration must be positive number"),
        name: yup.string().required("Name is required field")
    })
});

interface Props {
    goNextStep: () => void;
}
const CreateQuizView = (props: Props) => {
    const { goNextStep } = props;

    const { setQuiz } = useContext(QuizContext);
    const notify = useNotify();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    // state
    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);

    // define error for start date input
    const startDateError = useMemo(() => {
        if (!startDate) {
            return "Start date is required";
        }
        return null;
    }, [startDate]);

    // define error for end date input
    const endDateError = useMemo(() => {
        if (!endDate) {
            return "End date is required";
        }

        if (endDate?.isBefore(startDate)) {
            return "'End date' must be greater than 'Start date'";
        }

        return null;
    }, [startDate, endDate]);

    // on start date change
    const onStartDateChange = (value: Moment | null) => {
        if (value?.isValid()) {
            setStartDate(value);
        }
    };

    // on end date change
    const onEndDateChange = (value: Moment | null) => {
        if (value?.isValid()) {
            setEndDate(value);
        }
    };

    // hanlde submit
    const onSubmit = async (value: any) => {
        // return if one of startDate or endDate error
        if (startDateError || endDateError) {
            return;
        }
        // re-calculate
        const data = structuredClone(value) as CreateQuizInput;
        data.setting.start_time = startDate!.valueOf();
        data.setting.end_time = endDate!.valueOf();
        //
        try {
            const quiz = await createQuiz(data);
            setQuiz(quiz);
            notify("Create quiz successfull", NotifyType.success);
            goNextStep();
        } catch (error: any) {
            notify("Failed to create quiz. Try again later", NotifyType.error);
        }
    };

    return (
        <Card p="2rem">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="1rem">
                    <Box mb="1rem">
                        <Typography variant="body1" fontWeight="600">
                            Create Quiz
                        </Typography>
                        <Typography variant="body2">Setup quiz information</Typography>
                    </Box>
                    <Grid container spacing="1rem">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                {...register("setting.name")}
                                label="Name *"
                                error={!!(errors?.setting as any)?.name}
                                helperText={(errors?.setting as any)?.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                defaultValue={0}
                                {...register("setting.duration")}
                                label="Duration (second) *"
                                error={!!(errors?.setting as any)?.duration}
                                helperText={(errors?.setting as any)?.duration?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                value={startDate}
                                onChange={onStartDateChange}
                                label="Start time *"
                                minDate={moment()}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        error={!!startDateError}
                                        helperText={startDateError}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                value={endDate}
                                onChange={onEndDateChange}
                                label="End time *"
                                minDate={startDate as any}
                                renderInput={(params) => (
                                    <TextField fullWidth {...params} error={!!endDateError} helperText={endDateError} />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Box>
                        <Button variant="contained" onClick={() => onSubmit("aaa")} disabled={isSubmitting}>
                            CREATE
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Card>
    );
};

export default React.memo(CreateQuizView);
