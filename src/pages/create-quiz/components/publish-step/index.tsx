import { Flex, Heading } from "@/components";
import { ROUTE } from "@/config/route";
import { useAppContext } from "@/hook/useAppContext";
import { useDisclosure } from "@/hook/useDisclosure";
import { publishQuiz } from "@/services/quiz.service";
import { NotifyType } from "@/types/general";
import {
    Alert,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../..";

interface Props {
    goPreviousStep: () => void;
    goNextStep: () => void;
}
const PublishStep = ({ goNextStep, goPreviousStep }: Props) => {
    const navigate = useNavigate();
    const { notify } = useAppContext();
    const { quiz } = useContext(QuizContext);
    const { isOpen, onClose, onToggle } = useDisclosure();

    const goToQuiz = () => {
        navigate("/" + ROUTE.QUIZ);
    };

    const handlePublish = async () => {
        if (!quiz) return;
        try {
            await publishQuiz(quiz?.id);
            notify("Publish successfull", NotifyType.success);
            onToggle();
            goNextStep();
        } catch (error: any) {
            notify("Failed to publish quiz : " + error.message, NotifyType.error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Stack gap="1rem">
                <br />
                <Heading mb="1rem">Pushlish Quiz</Heading>
                <Alert severity="warning">
                    <b>Warning:</b> After publishing, the quiz will be locked. You will not be able to change any
                    settings or add or remove questions.
                </Alert>
                <Alert severity="info">
                    <b>Info:</b> You can skip this step and publish later
                </Alert>
                <br />
                <Divider />
                <br />

                {/* button */}
                <Flex gap="1rem">
                    <Button sx={{ flexGrow: 1 }} variant="outlined" size="large" onClick={goPreviousStep}>
                        Back
                    </Button>
                    <Button sx={{ flexGrow: 1 }} variant="outlined" size="large" onClick={onToggle}>
                        Publish
                    </Button>
                </Flex>
                <Button variant="contained" size="large" onClick={goToQuiz}>
                    Finish
                </Button>
            </Stack>

            {/* publish dialog */}
            <Dialog open={isOpen} onClose={onClose} fullWidth>
                <DialogTitle>Pushlish Quiz</DialogTitle>
                <DialogContent>Are you sure about publishing this quiz ?</DialogContent>
                <DialogActions>
                    <Button onClick={onToggle}>Cancel</Button>
                    <Button onClick={handlePublish}>Accept</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
export default PublishStep;
