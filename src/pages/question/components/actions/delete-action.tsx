import { useAppContext } from "@/hook/useAppContext";
import { useDisclosure } from "@/hook/useDisclosure";
import { deleteQuestion } from "@/services/question.service";
import { NotifyType } from "@/types/general";
import { Question } from "@/types/question";
import { Delete } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from "@mui/material";

interface Props {
    question: Question;
    refreshData: any;
}
const DeleteAction = ({ question, refreshData }: Props) => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const { notify } = useAppContext();

    const handleDelete = async () => {
        try {
            await deleteQuestion(question.id);
            notify("Delete successfull", NotifyType.success);
            onToggle();
            refreshData && refreshData();
        } catch (error: any) {
            notify("Failed to delete this question : " + error.message, NotifyType.error);
        }
    };

    return (
        <>
            <IconButton children={<Delete />} onClick={onToggle} />
            <Dialog fullWidth open={isOpen} onClose={onClose}>
                <DialogTitle>Delete Question</DialogTitle>
                <DialogContent>
                    <DialogContentText>Do you want to delete this question ?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Accept</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default DeleteAction;
