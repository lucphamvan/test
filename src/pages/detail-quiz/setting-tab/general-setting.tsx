import { Card, Flex, Heading } from "@/components";
import { useDate } from "@/hook/useDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppContext } from "@/hook/useAppContext";
import { updateQuizSetting } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { Quiz, QuizSetting } from "@/types/quiz";
import styled from "@emotion/styled";
import moment from "moment";
import * as yup from "yup";

const Container = styled(Card)`
    .Mui-disabled {
        color: inherit !important;
        -webkit-text-fill-color: unset !important;
    }
`;
// schema for create quiz
const schema = yup.object().shape({
    duration: yup.number().required("Duration is required field").min(1, "Duration must be positive number"),
    name: yup.string().required("Name is required field")
});

interface Props {
    quiz: Quiz;
    setQuiz: Function;
}
const GeneralSetting = ({ quiz, setQuiz }: Props) => {
    // state for handle datepicker
    const { startDate, endDate, startDateErr, endDateErr, onEndDateChange, onStartDateChange } = useDate(
        quiz.setting.start_time,
        quiz.setting.end_time
    );
    const [disabled, setDisabled] = useState<boolean>(true);
    const { notify } = useAppContext();

    // hook form
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset
    } = useForm({ resolver: yupResolver(schema) });

    // enable/disable edit setting
    const toggleEditMode = () => setDisabled((v) => !v);

    // handle submit update
    const onSubmit = async (data: any) => {
        // prevent submit when  start date or end date is invalid
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
        // update quiz setting
        try {
            const _quiz = await updateQuizSetting(quiz.id, setting);
            setQuiz(_quiz);
            notify("Update quiz setting successfully", NotifyType.success);
            toggleEditMode();
        } catch (error: any) {
            notify("Failed to update quiz setting", NotifyType.error);
            console.log("failed to update quiz setting", error.message);
        }
    };

    // handle cancel edit mode
    const handleCancelEdit = () => {
        // reset default value
        reset({
            duration: quiz.setting.duration,
            name: quiz.setting.name
        });
        onStartDateChange(moment(quiz.setting.start_time));
        onEndDateChange(moment(quiz.setting.end_time));
        // disable edit mode
        toggleEditMode();
    };

    useEffect(() => {
        reset({
            duration: quiz.setting.duration,
            name: quiz.setting.name
        });
    }, [quiz, reset]);

    return (
        <Container p="2rem" mt="1rem">
            <Heading mb="1rem">Quiz Setting</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="1rem">
                    <Grid container spacing="1rem">
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...register("name")}
                                label="Name *"
                                fullWidth
                                disabled={disabled}
                                error={!!errors?.name}
                                helperText={errors?.name?.message as any}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                {...register("duration")}
                                label="Duration (minute) *"
                                type="number"
                                fullWidth
                                defaultValue={0}
                                disabled={disabled}
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
                                disabled={disabled}
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
                                disabled={disabled}
                                renderInput={(params) => (
                                    <TextField fullWidth {...params} error={!!endDateErr} helperText={endDateErr} />
                                )}
                            />
                        </Grid>
                    </Grid>
                    {!quiz?.published && (
                        <Flex justifyContent="flex-end" gap="1rem">
                            {disabled ? (
                                <Button variant="contained" onClick={toggleEditMode} sx={{ width: 120 }}>
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancelEdit}
                                        disabled={isSubmitting}
                                        sx={{ width: 120 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={isSubmitting}
                                        sx={{ width: 120 }}
                                    >
                                        Update
                                    </Button>
                                </>
                            )}
                        </Flex>
                    )}
                </Stack>
            </form>
        </Container>
    );
};

export default GeneralSetting;
