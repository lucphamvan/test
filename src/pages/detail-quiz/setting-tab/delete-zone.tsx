import { Card, Flex, Heading } from "@/components";
import { ROUTE } from "@/config/route";
import { useAppContext } from "@/hook/useAppContext";
import { useDisclosure } from "@/hook/useDisclosure";
import { deleteQuiz } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { Quiz } from "@/types/quiz";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface Props {
    quiz: Quiz;
}
const DeleteZone = ({ quiz }: Props) => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const navigate = useNavigate();
    const { notify } = useAppContext();

    const handleDelete = async () => {
        try {
            await deleteQuiz(quiz?.id);
            onClose();
            notify("Delete quiz successfull", NotifyType.success);
            navigate("/" + ROUTE.QUIZ);
        } catch (error: any) {
            console.log("failed to delete quiz");
            notify(error.message, NotifyType.error);
        }
    };

    return (
        <>
            <Card px="2rem" py="1.5rem">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Box>
                            <Heading className="color-danger">Delete Quiz</Heading>
                            <Typography variant="body2" color="text.secondary">
                                Delete the quiz, remove all data related to the quiz
                            </Typography>
                        </Box>
                        <Button variant="contained" className="bg-danger" sx={{ width: 120 }} onClick={onToggle}>
                            Delete
                        </Button>
                    </Flex>
                </Stack>
            </Card>
            {/* Dialog */}
            {isOpen && (
                <Dialog open={isOpen} onClose={onClose} fullWidth>
                    <DialogTitle>Delete Quiz</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this quiz ? This action cannot be undone.
                    </DialogContent>
                    <DialogActions>
                        <Button className="color-danger" onClick={onToggle}>
                            Cancel
                        </Button>
                        <Button className="color-danger" onClick={handleDelete}>
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default DeleteZone;
