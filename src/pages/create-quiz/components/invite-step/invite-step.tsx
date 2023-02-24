import { ROUTE } from "@/config/route";
import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
    goNextStep: () => void;
}
const InviteStep = ({ goNextStep }: Props) => {
    const navigate = useNavigate();

    const onFinish = () => {
        goNextStep();
        navigate("/" + ROUTE.QUIZ);
    };

    return (
        <Container maxWidth="sm">
            <Stack gap="1rem">
                <br />
                <Button variant="outlined" size="large">
                    Invite
                </Button>
                <Button variant="contained" size="large" onClick={onFinish}>
                    Finish
                </Button>
            </Stack>
        </Container>
    );
};
export default InviteStep;
