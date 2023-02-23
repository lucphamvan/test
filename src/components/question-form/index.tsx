import { Choice, Question, UpdateQuestionInput } from "@/types/question";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Flex, TextFieldError } from "@/components";
import { Add, Create } from "@mui/icons-material";
import uuid from "bson-objectid";
import * as yup from "yup";
import ChoiceList from "./choice-list";
import Notice from "./notice";
// define schema for yup form
const schema = yup
    .object()
    .shape({
        content: yup.string().required("Question content is required"),
        choices: yup
            .array()
            .of(
                yup.object().shape({
                    id: yup.string(),
                    content: yup.string().required("Answer content is required"),
                    isCorrect: yup.bool()
                })
            )
            .min(1, "Answer is required")
            .test("One correct test", "Required at least one correct answer", (choices) => {
                const correctChoices = choices?.filter((choice) => choice.isCorrect === true);
                return Boolean(correctChoices?.length);
            })
    })
    .required();

// interface props
interface Props {
    question: Question;
    onSubmit: (value: any) => void;
    resetRef: React.MutableRefObject<any>;
}

// component
const QuestionForm = (props: Props) => {
    const { question, onSubmit, resetRef } = props;
    question.choices.forEach((choice) => (choice.isCorrect = question.correct_choice_ids?.includes(choice.id)));
    const btnText = question.id ? "Update" : "Create";

    resetRef.current = () => {
        form.reset({
            content: "",
            choices: [{ id: uuid().toHexString(), content: "", isCorrect: false }],
            correct_choice_ids: []
        });
    };

    // hook-form
    const form = useForm<UpdateQuestionInput>({
        resolver: yupResolver(schema)
    });
    const fieldArray = useFieldArray({ control: form.control, name: "choices" });

    // reset default value
    useEffect(() => {
        form.reset({
            content: question?.content,
            choices: question?.choices,
            correct_choice_ids: question?.correct_choice_ids
        });
    }, [question, form]);

    // handle add answer
    const handleAddAnswer = () => {
        const option: Choice = { id: uuid().toHexString(), content: "", isCorrect: false };
        fieldArray.append(option);
    };

    // clear form data
    const clearForm = () => {
        form.reset({
            content: "",
            choices: [{ id: uuid().toHexString(), content: "", isCorrect: false }],
            correct_choice_ids: []
        });
    };

    const submit = (value: any) => {
        onSubmit(value);
        // in case add question => reset form
        if (!question.id) {
            clearForm();
        }
    };

    return (
        <form onSubmit={form.handleSubmit(submit)}>
            <Stack gap="1rem">
                <Notice />
                <TextField
                    {...form.register("content")}
                    multiline
                    fullWidth
                    label="Question *"
                    InputLabelProps={{ shrink: true }}
                    error={!!form.formState.errors?.content?.message}
                    helperText={form.formState.errors?.content?.message}
                />
                {/* render answer options */}
                <ChoiceList form={form} fieldArray={fieldArray} />
                {/* error answer options */}
                <TextFieldError name="choices" errors={form.formState.errors} />
                {/* button add answer */}
                <Flex justifyContent="space-between">
                    <Button
                        variant="outlined"
                        startIcon={<Add style={{ fontSize: 15, marginBottom: 2 }} />}
                        style={{ lineHeight: "initial" }}
                        size="large"
                        onClick={handleAddAnswer}
                    >
                        More answer
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Create style={{ fontSize: 15, marginBottom: 2 }} />}
                        size="large"
                        style={{ lineHeight: "initial" }}
                        type="submit"
                    >
                        {btnText}
                    </Button>
                </Flex>
            </Stack>
        </form>
    );
};
export default QuestionForm;
