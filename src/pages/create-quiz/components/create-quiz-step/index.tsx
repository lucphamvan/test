import { Card, Flex, Heading } from "@/components";
import { useAppContext } from "@/hook/useAppContext";
import { useDate } from "@/hook/useDate";
import { createQuiz, updateQuizSetting } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { QuizSetting } from "@/types/quiz";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { QuizContext } from "../..";

// schema for create quiz
const schema = yup.object().shape({
    duration: yup.number().required("Duration is required field").min(1, "Duration must be positive number"),
    name: yup.string().required("Name is required field")
});

interface Props {
    goNextStep: () => void;
}
const CreateQuizStep = (props: Props) => {
    const { goNextStep } = props;

    // state
    const { setQuiz, quiz } = useContext(QuizContext);
    const { startDate, endDate, startDateErr, endDateErr, onEndDateChange, onStartDateChange } = useDate(
        quiz?.setting?.start_time,
        quiz?.setting?.end_time
    );
    const { notify } = useAppContext();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (quiz) {
            reset({
                name: quiz.setting.name,
                duration: quiz.setting.duration
            });
        }
    }, [quiz, reset]);

    // handle submit
    const onSubmit = async (data: any) => {
        // error
        if (startDateErr || endDateErr) {
            return;
        }

        // setting for update
        const setting: QuizSetting = {
            duration: data.duration,
            name: data.name,
            start_time: startDate!.valueOf(),
            end_time: endDate!.valueOf()
        };

        // case 1: create new quiz
        if (!quiz) {
            try {
                const _quiz = await createQuiz(setting);
                setQuiz(_quiz);
                notify("Create quiz successfull", NotifyType.success);
                goNextStep();
            } catch (error: any) {
                notify("Failed to create quiz. Try again later", NotifyType.error);
            }
            return;
        }

        // case 2: update quiz
        try {
            const _quiz = await updateQuizSetting(quiz.id, setting);
            setQuiz(_quiz);
            notify("Update quiz successfull", NotifyType.success);
            goNextStep();
        } catch (error: any) {
            notify("Failed to update quiz. Try again later", NotifyType.error);
        }
    };

    return (
        <Card p="2rem">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="1rem">
                    <Box mb="1rem">
                        <Heading>{quiz ? "Update Quiz" : "Create Quiz"}</Heading>
                        <Typography variant="body2">Setup quiz information</Typography>
                    </Box>
                    <Grid container spacing="1rem">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                {...register("name")}
                                label="Name *"
                                error={!!errors?.name}
                                helperText={errors?.name?.message as any}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                defaultValue={0}
                                {...register("duration")}
                                label="Duration (minute) *"
                                error={!!errors?.duration}
                                helperText={errors?.duration?.message as any}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                value={startDate}
                                onChange={onStartDateChange}
                                label="Start time *"
                                minDate={moment()}
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth error={!!startDateErr} helperText={startDateErr} />
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
                                    <TextField fullWidth {...params} error={!!endDateErr} helperText={endDateErr} />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Flex justifyContent="space-between">
                        <Button variant="contained" type="submit" disabled={isSubmitting} className="w-120">
                            {quiz ? "Update" : "Create"}
                        </Button>
                        <Button variant="contained" disabled={!quiz} onClick={goNextStep} className="w-120">
                            Next
                        </Button>
                    </Flex>
                </Stack>
            </form>
        </Card>
    );
};

export default React.memo(CreateQuizStep);
