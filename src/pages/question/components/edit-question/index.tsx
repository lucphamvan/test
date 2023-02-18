import { TextFieldError, TooltipBody } from "@/components";
import { DndContext, DragContext } from "@/components/dnd-context";
import { useDisclosure } from "@/hook/useDisclosure";
import { useNotify } from "@/hook/useNotify";
import { updateQuestion } from "@/services/question.service";
import { NotifyType } from "@/types/general";
import { Choice, Question, UpdateQuestionInput } from "@/types/question";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bolt, DragIndicator, Edit, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import uuid from "bson-objectid";
import { useCallback, useEffect } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import Notice from "../notice";
import { AnswerBox, AnswerFlex, Input } from "../styled";

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
    refreshData: Function;
}

const EditQuestion = ({ question, refreshData }: Props) => {
    // console.log(JSON.stringify(question, null, 4));
    const notify = useNotify();
    const { isOpen, onClose, onToggle } = useDisclosure();
    // set correct answer
    question.choices.forEach((i) => (i.isCorrect = question.correct_choice_ids.includes(i.id)));
    // cached inserted answers
    // hook form
    const {
        reset,
        control,
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<UpdateQuestionInput>({
        resolver: yupResolver(schema)
    });
    const { fields, append, remove, move } = useFieldArray({ control, name: "choices" });

    useEffect(() => {
        reset({
            content: question.content,
            choices: question.choices,
            correct_choice_ids: question.correct_choice_ids
        });
    }, [question, reset, isOpen]);

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
    };

    // handle add answer
    const handleAddAnswer = () => {
        const option: Choice = { id: uuid().toHexString(), content: "" };
        append(option);
    };

    // handle update question
    const handleUpdateQuestion = async (data: any) => {
        const updateQuestionInput = structuredClone(data) as UpdateQuestionInput;
        updateQuestionInput.correct_choice_ids = data.choices
            .filter((o: Choice) => o.isCorrect)
            .map((o: Choice) => o.id);

        if (!updateQuestionInput.correct_choice_ids || !updateQuestionInput.correct_choice_ids.length) {
            notify("Required at least one correct answer", NotifyType.error);
            return;
        }

        try {
            await updateQuestion(question.id, updateQuestionInput);
            notify("Update question successfull", NotifyType.success);
            refreshData();
            closeDialog();
        } catch (error: any) {
            notify("Failed to create question: " + error.message, NotifyType.error);
        }
    };

    // drag end : save answer was reordered
    const handleDragEnd = useCallback(
        ({ source, destination }: DropResult) => {
            if (destination) {
                move(source.index, destination.index);
            }
        },
        [move]
    );

    // render list answer options
    const renderAnswerOptions = useCallback(() => {
        const listOptions = fields.map((item, index) => {
            return (
                <DragContext key={item.id} id={item.id} index={index}>
                    <AnswerFlex tabIndex={-1}>
                        {/* drag icon */}
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
                        {/* body answer */}
                        <AnswerBox icon={false}>
                            <Stack flexDirection="row" alignItems="center" gap="0.5rem">
                                <Input
                                    {...register(`choices.${index}.content`)}
                                    fullWidth
                                    placeholder={`Answer ${index + 1}`}
                                />
                                <Checkbox
                                    defaultChecked={item.isCorrect}
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
                        {/* delete icon */}
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
            <DndContext onDragEnd={handleDragEnd} id="anwswer-options">
                {listOptions}
            </DndContext>
        );
    }, [fields, handleDragEnd, errors, register, remove]);

    return (
        <>
            <IconButton children={<Edit />} onClick={onToggle} />
            {isOpen && (
                <Dialog open={isOpen} onClose={onDialogClose} fullWidth>
                    <form onSubmit={handleSubmit(handleUpdateQuestion)}>
                        <DialogTitle sx={{ px: "2.75rem", marginTop: "0.5rem" }}>Edit Question</DialogTitle>
                        <DialogContent>
                            <Stack gap="1.5rem" px="1rem">
                                {/* notice */}
                                <Notice />
                                {/* question content */}

                                <TextField {...register("content")} fullWidth multiline rows={3} label="Question *" />
                                <TextFieldError errors={errors} name="content" />

                                {/* render answer options */}
                                {renderAnswerOptions()}
                                {/* error answer options */}
                                <TextFieldError name="choices" errors={errors} />
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
                                Update
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            )}
        </>
    );
};

export default EditQuestion;
