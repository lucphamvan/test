import { QuizAnswer } from "@/types/quiz";
import styled from "@emotion/styled";
import { Chip, ChipProps, Stack } from "@mui/material";

interface StyledChipProps extends ChipProps {
    answered: boolean;
}
const StyledChip = styled(Chip)<StyledChipProps>`
    cursor: pointer;
    background-color: ${(props) => (props.answered ? "#19a05c" : "#e0e0e0")};
    color: ${(props) => (props.answered ? "white" : "black")};
    font-weight: 600;
`;

interface Props {
    quizAnswer: QuizAnswer;
    setCurrentIndex: (index: number) => void;
}
const SelectedChoices = ({ quizAnswer, setCurrentIndex }: Props) => {
    return (
        <Stack direction="row" spacing={1}>
            {quizAnswer.answers.map((answer, index) => (
                <StyledChip
                    key={answer.question_id}
                    label={index + 1}
                    answered={!!answer.selected_choice_ids.length}
                    onClick={() => setCurrentIndex(index)}
                />
            ))}
        </Stack>
    );
};

export default SelectedChoices;
