import { Card, Flex, Heading } from "@/components";
import { Quiz } from "@/types/quiz";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface Props {
    quiz: Quiz;
    setQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>;
}
const InviteZone = ({ quiz, setQuiz }: Props) => {
    return (
        <>
            {quiz.published && (
                <Card px="2rem" py="1.5rem">
                    <Stack>
                        <Flex justifyContent="space-between">
                            <Box>
                                <Heading>Invite</Heading>
                                <Typography variant="body2" color="text.secondary">
                                    Invite students to take the quiz
                                </Typography>
                            </Box>
                            <Button variant="contained" sx={{ width: 120 }}>
                                Invite
                            </Button>
                        </Flex>
                    </Stack>
                </Card>
            )}
        </>
    );
};
export default InviteZone;
