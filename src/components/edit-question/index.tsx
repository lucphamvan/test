import { Question, UpdateQuestionInput, UpdateQuestionSchema } from "@/types/question";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useFieldArray, useForm, UseFormHandleSubmit } from "react-hook-form";
import * as yup from "yup";
import { DragContext } from "../dnd-context";
import Notice from "./notice";

// define schema for yup form
const schema = yup
    .object()
    .shape({
        content: yup.string().required("Question is required content"),
        choices: yup
            .array()
            .of(
                yup.object().shape({
                    id: yup.string(),
                    content: yup.string().required("Answer is required content"),
                    isCorrect: yup.bool()
                })
            )
            .min(1, "Answer is required")
    })
    .required();

interface Props {
    question: Question;
    onSubmit: (value: any) => void;
}

const EditQuestionForm = (props: Props) => {
    const { question, onSubmit } = props;
    const {
        reset,
        control,
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<UpdateQuestionSchema>({
        resolver: yupResolver(schema)
    });
    const { fields, append, remove, move } = useFieldArray({ control, name: "choices" });

    const renderOptionsAnswer = () => {};

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="1rem">
                <Notice />
                <TextField multiline label="Question" {...register("content")} />
            </Stack>
        </form>
    );
};
export default EditQuestionForm;
