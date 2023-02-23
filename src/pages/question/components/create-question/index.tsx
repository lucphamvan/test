import { TextFieldError, TooltipBody } from "@/components";
import { DndContext, DragContext } from "@/components/dnd-context";
import { useAppContext } from "@/hook/useAppContext";
import { useDisclosure } from "@/hook/useDisclosure";
import { createQuestion } from "@/services/question.service";
import { NotifyType } from "@/types/general";
import { Choice, CreateQuestionInput } from "@/types/question";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Bolt, DragIndicator, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import uuid from "bson-objectid";
import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import Notice from "../notice";
import { AnswerBox, AnswerFlex, Input } from "../styled";

// validator schema for question
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

/*
 *************************************************
 *************************************************
 */
interface Props {
    refreshData: any;
}

const CreateQuestionButton = ({ refreshData }: Props) => {
    const { notify } = useAppContext();
    const { isOpen, onClose, onToggle } = useDisclosure();

    // hook form
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
        control
    } = useForm<CreateQuestionInput>({
        resolver: yupResolver(schema),
        defaultValues: {
            content: "",
            choices: [{ id: uuid().toHexString(), content: "" }]
        }
    });

    const { fields, append, remove, move } = useFieldArray({ control, name: "choices" });

    // function handle close dialog , prevent close when click outside
    const onDialogClose = (event: object, reason: string) => {
        // prevent close when click outside
        if (reason !== "backdropClick") {
            closeDialog();
        }
    };

    // close dialog
    const closeDialog = () => {
        onClose();
        resetDialog();
    };

    // reset form data
    const resetDialog = () => {
        reset({
            content: "",
            choices: [{ id: uuid().toHexString(), content: "" }]
        });
    };

    // handle create question
    const handleCreateQuestion = async (data: any) => {
        const createQuestionInput = structuredClone(data) as CreateQuestionInput;
        createQuestionInput.correct_choice_ids = data.choices
            .filter((o: Choice) => o.isCorrect)
            .map((o: Choice) => o.id);

        if (!createQuestionInput.correct_choice_ids || !createQuestionInput.correct_choice_ids.length) {
            notify("Required at least one correct answer", NotifyType.error);
            return;
        }

        try {
            await createQuestion(createQuestionInput);
            notify("Create question successfull", NotifyType.success);
            refreshData();
            closeDialog();
        } catch (error: any) {
            notify("Failed to create question: " + error.message, NotifyType.error);
        }
    };

    // handle add answer
    const handleAddAnswer = () => {
        const option: Choice = { id: uuid().toHexString(), content: "" };
        append(option);
    };

    // when draggEnd, save answer was reordered
    const handleDragEnd = useCallback(
        ({ source, destination }: DropResult) => {
            if (destination) {
                move(source.index, destination.index);
            }
        },
        [move]
    );

    // handle render answer options
    const renderAnswerOptions = useCallback(() => {
        const listAnswers = fields.map((item, index) => {
            return (
                <DragContext key={item.id} id={item.id} index={index}>
                    <AnswerFlex tabIndex={-1}>
                        <div className="drag-btn">
                            <Tooltip
                                enterDelay={400}
                                placement="top"
                                arrow
                                title={<TooltipBody>Click and drag to move</TooltipBody>}
                            >
                                <DragIndicator style={{ color: "#6e7375" }} />
                            </Tooltip>
                        </div>
                        <AnswerBox icon={false}>
                            <Stack flexDirection="row" alignItems="center" gap="0.5rem">
                                <Input
                                    {...register(`choices.${index}.content`)}
                                    fullWidth
                                    placeholder={`Answer ${index + 1}`}
                                />
                                <Checkbox
                                    {...register(`choices.${index}.isCorrect`)}
                                    icon={<RadioButtonUnchecked />}
                                    checkedIcon={<RadioButtonChecked />}
                                />
                            </Stack>

                            {/* errors */}
                            <Typography fontSize={12} mt="0.25rem" color="error" fontWeight="400">
                                {errors?.choices && errors.choices[index]?.content?.message}
                            </Typography>
                        </AnswerBox>

                        <div className="delete-btn">
                            <Tooltip placement="top" arrow title={<TooltipBody>Delete</TooltipBody>}>
                                <Bolt onClick={() => remove(index)} style={{ color: "#6e7375" }} />
                            </Tooltip>
                        </div>
                    </AnswerFlex>
                </DragContext>
            );
        });

        return (
            <DndContext onDragEnd={handleDragEnd} id="answer-options">
                {listAnswers}
            </DndContext>
        );
    }, [errors, fields, register, remove, handleDragEnd]);

    // render
    return (
        <>
            <Button
                startIcon={<Add style={{ fontSize: 15, marginBottom: 2 }} />}
                sx={{ lineHeight: "inherit", gap: 0 }}
                variant="contained"
                onClick={onToggle}
            >
                Create Question
            </Button>
            <Dialog open={isOpen} onClose={onDialogClose} fullWidth>
                <form onSubmit={handleSubmit(handleCreateQuestion)}>
                    <DialogTitle sx={{ px: "2.75rem", marginTop: "0.5rem" }}>Create Question</DialogTitle>
                    <DialogContent>
                        <Stack gap="1.5rem" px="1rem">
                            {/* notice */}
                            <Notice />
                            {/* question content */}
                            <div>
                                <TextField {...register("content")} fullWidth multiline label="Question *" />
                                <TextFieldError name="content" errors={errors} />
                            </div>
                            {/* question answer options */}
                            {renderAnswerOptions()}
                            {/* error answer options */}
                            <TextFieldError name="answer_option" errors={errors} />
                            {/* button add answer */}
                            <Stack flexDirection="row">
                                <Button
                                    variant="outlined"
                                    size="large"
                                    style={{ lineHeight: "initial" }}
                                    onClick={handleAddAnswer}
                                >
                                    Add answer
                                </Button>
                            </Stack>
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ px: "2rem" }}>
                        <Button onClick={closeDialog}>Cancel</Button>
                        <Button disabled={isSubmitting} type="submit">
                            Create
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default CreateQuestionButton;
