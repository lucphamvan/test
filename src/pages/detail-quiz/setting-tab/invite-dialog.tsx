import { Flex, Heading, TooltipBody } from "@/components";
import { useAppContext } from "@/hook/useAppContext";
import { inviteEmail } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { Quiz } from "@/types/quiz";
import { yupResolver } from "@hookform/resolvers/yup";
import { Delete, PlaylistAdd, Send } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    data: yup
        .array()
        .of(
            yup.object().shape({
                email: yup.string().required("Email is required").email("Email is invalid"),
                name: yup.string().required("Name is required")
            })
        )
        .min(1, "Required at least one email")
});

interface Props {
    isOpen: boolean;
    onClose: () => void;
    quiz: Quiz;
    onTriggerRefetch: () => void;
}
// remove dialog component
const InviteDialog = ({ isOpen, onClose, quiz, onTriggerRefetch }: Props) => {
    // react hook form
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: "data"
    });
    const { notify } = useAppContext();

    // default reset form
    useEffect(() => {
        reset({ data: [{ email: "", name: "" }] });
    }, [reset, isOpen]);

    // handle add more field
    const handleAddMore = useCallback(async () => {
        append({ email: "", name: "" });
    }, [append]);

    // handle remove field
    const handleRemove = useCallback(
        (index: number) => {
            if (fields.length > 1) {
                remove(index);
            }
        },
        [fields, remove]
    );

    // handle render fields
    const renderFields = useCallback(() => {
        return fields.map((field, index) => {
            const error = errors.data && (errors as any).data[index];
            return (
                <Flex key={field.id} gap="1rem" style={{ alignItems: "baseline" }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        {...register(`data.${index}.email` as const)}
                        error={!!error?.email}
                        helperText={error?.email?.message}
                    />
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        {...register(`data.${index}.name` as const)}
                        error={!!error?.name}
                        helperText={error?.name?.message}
                    />
                    <IconButton sx={{ transform: "translateY(4px)" }} onClick={() => handleRemove(index)}>
                        <Delete />
                    </IconButton>
                </Flex>
            );
        });
    }, [fields, errors, register, handleRemove]);

    // handle submit form
    const onSubmit = async (data: any) => {
        try {
            await inviteEmail(quiz.id, data);
            onClose();
            notify("Invite successfully", NotifyType.success);
            onTriggerRefetch();
        } catch (error: any) {
            notify(error.message, NotifyType.error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle sx={{ pb: "5px" }}>
                <Heading style={{ fontSize: 20 }}>Invite user to join the quiz</Heading>
            </DialogTitle>{" "}
            <DialogContent style={{ paddingTop: 10, height: "100vh" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap="1rem">{renderFields()}</Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "space-between", px: "1.75rem" }}>
                <Tooltip placement="top" arrow title={<TooltipBody>Add more</TooltipBody>}>
                    <IconButton onClick={handleAddMore} color="primary">
                        <PlaylistAdd />
                    </IconButton>
                </Tooltip>

                <Button
                    variant="outlined"
                    sx={{ lineHeight: "inherit" }}
                    endIcon={<Send style={{ fontSize: 15, marginBottom: 2 }} />}
                    className="w-120"
                    onClick={handleSubmit(onSubmit)}
                >
                    Invite
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InviteDialog;
