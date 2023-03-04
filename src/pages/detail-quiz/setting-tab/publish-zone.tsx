import { Card, Flex, Heading } from "@/components";
import { useAppContext } from "@/hook/useAppContext";
import { useDisclosure } from "@/hook/useDisclosure";
import { publishQuiz } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import { Quiz } from "@/types/quiz";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";

interface Props {
    quiz: Quiz;
    setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
}
const PublishZone = ({ quiz, setQuiz }: Props) => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const { notify } = useAppContext();

    const handlePublish = async () => {
        try {
            await publishQuiz(quiz?.id);
            setQuiz({ ...quiz, published: true });
            onClose();
            notify("Publish quiz successfull", NotifyType.success);
        } catch (error: any) {
            console.log("failed to publish quiz");
            notify(error.message, NotifyType.error);
        }
    };

    if (quiz.published) return <></>;

    return (
        <>
            <Card px="2rem" py="1.5rem">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Box>
                            <Heading>Publish Quiz</Heading>
                            <Typography variant="body2" color="text.secondary">
                                Publish the quiz, so that students can take the quiz
                            </Typography>
                        </Box>
                        <Button variant="contained" sx={{ width: 120 }} onClick={onToggle}>
                            Publish
                        </Button>
                    </Flex>
                </Stack>
            </Card>

            {/* Dialog */}
            {isOpen && (
                <Dialog open={isOpen} onClose={onClose} fullWidth>
                    <DialogTitle>Pushlish Quiz</DialogTitle>
                    <DialogContent>
                        <Stack gap="0.5rem">
                            <Typography>After publishing, the quiz will be locked.</Typography>
                            <Typography>
                                You will not be able to change any settings or add or remove questions.
                            </Typography>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onToggle}>Cancel</Button>
                        <Button onClick={handlePublish}>Accept</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default PublishZone;
