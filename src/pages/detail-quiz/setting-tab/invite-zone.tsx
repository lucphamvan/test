import { Card, Flex, Heading } from "@/components";
import { useDisclosure } from "@/hook/useDisclosure";
import { Quiz } from "@/types/quiz";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import InviteDialog from "./invite-dialog";

interface Props {
    quiz: Quiz;
    setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
}
const InviteZone = ({ quiz, setQuiz }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
            {quiz.published && (
                <>
                    <Card px="2rem" py="1.5rem">
                        <Stack>
                            <Flex justifyContent="space-between">
                                <Box>
                                    <Heading>Invite</Heading>
                                    <Typography variant="body2" color="text.secondary">
                                        Invite students to take the quiz
                                    </Typography>
                                </Box>
                                <Button variant="contained" className="w-120" onClick={onOpen}>
                                    Invite
                                </Button>
                            </Flex>
                        </Stack>
                    </Card>
                    <InviteDialog quiz={quiz} isOpen={isOpen} onClose={onClose} />
                </>
            )}
        </>
    );
};
export default InviteZone;
