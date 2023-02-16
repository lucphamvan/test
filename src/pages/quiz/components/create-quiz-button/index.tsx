import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateQuizButton = () => {
    const navigate = useNavigate();

    const gotoCreateQuiz = () => {
        navigate("/quizzes/create");
    };

    return (
        <Button
            startIcon={<Add style={{ fontSize: 15, marginBottom: 2 }} />}
            sx={{ lineHeight: "inherit", gap: 0 }}
            variant="contained"
            onClick={gotoCreateQuiz}
        >
            Create Quiz
        </Button>
    );
};

export default CreateQuizButton;
